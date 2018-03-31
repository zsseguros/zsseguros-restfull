const router = require('express').Router();
const apolicesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');
const {dbConfig} = require('../config/configs');

router.post('/insere', (req: any, res: any) => {

  const body = req.body;

  const insertArray = [
    body.placa.replace('-', '')+body.chassi.slice(14),
    body.placa,
    body.chassi,
    body.marca,
    body.modelo,
    body.ano_fabricacao,
    body.cod_cliente,
    body.ano_modelo
  ];

  const dao = new apolicesDAO(dbConfig);

  const rows = dao.insertVeiculo('tbl_veiculo', insertArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

});

router.get('/lista', (req, res) => {

  const dao = new apolicesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_veiculo', (error, rows) => {
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

  dao.select('SELECT * FROM tbl_veiculo WHERE cod_veiculo='+id, (error, rows) => {
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
    body.placa,
    body.chassi,
    body.marca,
    body.modelo,
    body.ano_fabricacao,
    body.cod_cliente,
    body.ano_modelo
  ];

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new apolicesDAO(dbConfig);

  dao.updateVeiculo('tbl_veiculo', id, updateArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

export default router;