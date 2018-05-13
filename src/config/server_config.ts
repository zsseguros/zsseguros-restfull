const express = require('express');
const bodyParser = require('body-parser');
import clientes from '../routes/clientes';
import apolices from '../routes/apolices';
import veiculos from '../routes/veiculos';
import * as cors from 'cors';

module.exports = function(){
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/clientes', clientes);
  app.use('/apolices', apolices);
  app.use('/veiculos', veiculos);

  return app;
}