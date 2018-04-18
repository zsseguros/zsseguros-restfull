const router = require('express').Router();
const clientesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');
const {dbConfig} = require('../config/configs');

router.post('/insere', (req: any, res: any) => {

  const body = req.body;

  const insertArray = [
    body.cod_cliente,
    'A5269J70855881',
    body.nome,
    body.sobrenome,
    body.cpf,
    body.rg,
    body.dt_nascimento,
    moment().format('YYYY-MM-DD'),
    body.logradouro,
    Number(body.numero),
    body.bairro,
    body.cep,
    body.cidade,
    body.uf,
    body.complemento_endereco,
    body.genero,
    1
  ];
  
  const dao = new clientesDAO(dbConfig);

  const rows = dao.insertCliente('tbl_cliente', insertArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

});

router.get('/lista', (req, res) => {

  const dao = new clientesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_cliente', (error, rows) => {
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

  const dao = new clientesDAO(dbConfig);

  dao.select('SELECT * FROM tbl_cliente WHERE cod_cliente='+id, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

router.get('/busca-detalhes/:id', (req: any, res: any) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new clientesDAO(dbConfig);
  let obj = null;

  dao.select('SELECT * FROM tbl_cliente WHERE cod_cliente='+id, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      
      obj = {
        client: rows[0]
      }
      // Busca apolices do cliente
      dao.select('SELECT * FROM tbl_apolice WHERE cod_cliente ='+id, (error, rows) => {
        if ( error ) {
          obj = {
            ...obj,
            apolices: null
          }

          res.status(200).json({ obj });

        } else {
            obj = {
              ...obj,
              apolices: rows
            }
            // retorna
            res.status(200).json({ ...obj });
        }

      });

    }
  });
});

router.put('/altera/:id', (req: any, res: any) => {
  const { id } = req.params;
  const body = req.body;

  const updateArray = [
    body.nome,
    body.sobrenome,
    body.cpf,
    body.rg,
    body.dt_nascimento,
    body.logradouro,
    Number(body.numero),
    body.bairro,
    body.cep,
    body.cidade,
    body.uf,
    body.complemento_endereco,
    body.genero
  ];

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }

  const dao = new clientesDAO(dbConfig);

  dao.updateCliente('tbl_cliente', id, updateArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });
});

export default router;