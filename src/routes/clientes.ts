const router = require('express').Router();
const clientesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');
const {dbConfig} = require('../config/configs');
const {pagination} = require('../APIs/filters');

router.post('/insere', (req: any, res: any) => {

  const body = req.body;

  let newId = body.cod_cliente.replace(/\./g, '');
  newId = newId.replace(/-/g, '');

  const insertArray = [
    newId,
    'A5269J70855881',
    body.nome,
    body.sobrenome,
    body.cpf,
    body.cnh,
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
      
      if ( req.query.begin && req.query.end ) {
        res.status(200).json({ rows: pagination(req.params.begin, req.params.end, rows) });
      } else {
        res.status(200).json({ rows });
      }
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
  let { id } = req.params;

  let newId = id.replace(/\./g, '');
  id = newId.replace(/-/g, '');

  if (isNaN(id)) {
    res.status(400).json({ error: 'Incorrect param!' });
  }
console.log(id)
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
    body.cnh,
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

router.post('/tarefa-insere', (req: any, res: any) => {
  const body = req.body;

  let insertArray = [
    body.cod_cliente,
    body.titulo,
    moment().format('YYYY-DD-MM'),
    body.dt_final,
    // moment(body.dt_final).format('YYYY-DD-MM'),
    String(body.notificar).toLowerCase() === 'true',
    body.descricao
  ];

  const dao = new clientesDAO(dbConfig);

  dao.insertTarefa('tbl_tarefa', insertArray, (error, rows) => {
    if ( error ) {
      console.log(error)
      res.status(500).json({ error });
      return;
    } else {
      res.status(200).json({ rows });
    }
  });
});

router.get('/tarefa-lista/:id', (req, res) => {
  const { id } = req.params;
  const dao = new clientesDAO(dbConfig);

  if ( id ) {
    dao.select('SELECT * FROM tbl_tarefa WHERE cod_cliente ='+req.params.id, (error, rows) => {
      if ( error ) {
        res.status(500).json({ error });
      } else {
        res.status(200).json({ rows });
      }
    });    
  } else {
    res.status(400).json({ error: 'Missing client\'s ID!' });
  }

});

router.get('/tarefa-lista', (req, res) => {
  const dao = new clientesDAO(dbConfig);

    dao.select('SELECT * FROM tbl_tarefa', (error, rows) => {
      if ( error ) {
        res.status(500).json({ error });
      } else {
        res.status(200).json({ rows });
      }
    });    

});

export default router;