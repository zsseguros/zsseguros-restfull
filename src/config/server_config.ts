const express = require('express');
const bodyParser = require('body-parser');
import clientes from '../routes/clientes';
import apolices from '../routes/apolices';
import veiculos from '../routes/veiculos';
import * as cors from 'cors';
const fs = require('fs');

module.exports = function(){
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use('*', (req: any, res: any, next: Function) => {

    fs.appendFile('/home/caio/api_logs.txt', "\n"+String(req.ip)+" - "+req.get("referer"), (error, success) => {
      console.log(req)
      next();
    });

  });

  app.use('/clientes', clientes);
  app.use('/apolices', apolices);
  app.use('/veiculos', veiculos);

  return app;
}