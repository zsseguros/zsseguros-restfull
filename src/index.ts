const app = require('./config/server_config')();

const PORT = '8383';

app.listen(PORT, () => {
  console.log('Listening to...', PORT);
});