const router = require('express').Router();
const apolicesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');
const {dbConfig} = require('../config/configs');

router.post('/insere', (req: any, res: any) => {

  const body = req.body;

  const insertArray = [
    body.cod_apolice,
    body.cod_cliente,
    moment(body.dt_emissao).format("YYYY-MM-DD"),
    moment(body.dt_vigencia).format("YYYY-MM-DD"),
    body.seguradora,
    Number(body.classe_bonus).toFixed(2),
    Number(body.vl_franquia).toFixed(2),
    Number(body.vl_franquia_vidros).toFixed(2),
    body.nome_arquivo,
    Number(body.vl_premio_total).toFixed(2),
    body.ativa
  ];

console.log(insertArray, insertArray.length);

  const dao = new apolicesDAO(dbConfig);

  const rows = dao.insertApolice('tbl_apolice', insertArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

});

router.get('/lista', (req, res) => {

  const dao = new apolicesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_apolice', (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

});

router.get('/busca/:id', (req: any, res: any) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_apolice WHERE cod_apolice='+id, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

router.get('/busca/referencia/cliente/:id', (req: any, res: any) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_apolice WHERE cod_cliente='+id, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

router.get('/busca/referencia/veiculo/:id', (req: any, res: any) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_apolice WHERE cod_veiculo='+id, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

router.put('/altera/:id', (req: any, res: any) => {
  const { id } = req.params;
  const body = req.body;

  const updateArray = [
    body.cod_apolice,
    body.cod_cliente,
    moment(body.dt_emissao).format("YYYY-MM-DD"),
    moment(body.dt_vigencia).format("YYYY-MM-DD"),
    body.seguradora,
    Number(body.classe_bonus).toFixed(2),
    Number(body.vl_franquia).toFixed(2),
    Number(body.vl_franquia_vidros).toFixed(2),
    body.nome_arquivo,
    Number(body.vl_premio_total).toFixed(2),
    moment(body.dt_vigencia) < moment()
  ];
console.log(updateArray)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.updateApolice('tbl_apolice', id, updateArray, (error, rows) => {
    if ( error ) {
      console.log(error)
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

export default router;