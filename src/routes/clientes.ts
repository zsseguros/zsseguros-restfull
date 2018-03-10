const router = require('express').Router();
const clientesDAO = require('../DAO/mariadbDAO');
const moment = require('moment');

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'dbn*2018',
  db: 'db_zsseguros_dev'
}

router.post('/insere', (req: any, res: any) => {

  const body = req.body;
  console.log("body: ", req.body);

  const insertArray = [
    body.cod_cliente,
    body.cod_corretor,
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
    body.genero
  ];

  const dao = new clientesDAO(config);

  const rows = dao.insert('tbl_cliente', insertArray, (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

});

router.get('/lista', (req, res) => {

  const dao = new clientesDAO(config);

  dao.select('SELECT * FROM tbl_cliente', (error, rows) => {
    if ( error ) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ rows });
    }
  });

})

module.exports = router;