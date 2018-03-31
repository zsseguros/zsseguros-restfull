const router = require('express').Router();
const apolicesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');
const {dbConfig} = require('../config/configs');

router.post('/insere', (req: any, res: any) => {

  const body = req.body;

  const insertArray = [
    body.cod_apolice,
    body.cod_cliente,
    body.cod_veiculo,
    moment(body.dt_emissao).format("YYYY-MM-DD"),
    moment(body.dt_vigencia).format("YYYY-MM-DD"),
    body.seguradora,
    body.classe_bonus,
    Number(body.vl_franquia),
    Number(body.vl_franquia_vidros),
    body.nome_arquivo,
    Number(body.vl_premio_total)
  ];

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

router.put('/altera/:id', (req: any, res: any) => {
  const { id } = req.params;
  const body = req.body;

  const updateArray = [
    body.cod_veiculo,
    moment(body.dt_emissao).format("YYYY-MM-DD"),
    moment(body.dt_vigencia).format("YYYY-MM-DD"),
    body.seguradora,
    body.classe_bonus,
    Number(body.vl_franquia),
    Number(body.vl_franquia_vidros),
    body.nome_arquivo,
    Number(body.vl_premio_total)
  ];

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.updateCliente('tbl_apolice', id, updateArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

export default router;