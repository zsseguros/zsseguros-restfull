const express = require('express');
const bodyParser = require('body-parser');
import clientes from '../routes/clientes';
import apolices from '../routes/apolices';

module.exports = function(){
  const app = express();

  app.use(bodyParser.json());
  app.use('*',(req: any, res: any, next: Function) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use('/clientes', clientes);
  app.use('/apolices', apolices);

  return app;
}