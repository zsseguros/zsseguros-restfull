const Mariasql = require('mariasql');

interface Configs {
  host: string,
  port: number,
  user: string,
  password: string,
  db: string
}

function MariasqlDAO(configs: Configs){
  this._connection = new Mariasql(configs);
}

MariasqlDAO.prototype.select = function(queryString: string, next: Function) {

  this._connection.query(queryString, null, {userArray: true}, (error, rows) => {
    next(error, rows);
  });

};

MariasqlDAO.prototype.insert = function(table: string, values: Array<any>, next: Function) {
  console.log(values)

  this._connection.query(`INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error, rows) => {
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });

};

module.exports = MariasqlDAO;