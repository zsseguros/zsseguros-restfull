const express = require('express');
const bodyParser = require('body-parser');
const clientes = require('../routes/clientes');

module.exports = function(){
  const app = express();

  app.use(bodyParser.json());
  // app.use('*',(req: any, res: any, next: Function) => {
  //   res.set('Access-Control-Allow-Origin', '*');
  //   next();
  // });

  app.use('/clientes', clientes);

  return app;
}