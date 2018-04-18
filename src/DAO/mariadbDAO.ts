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

  this._connection.end();
};

MariasqlDAO.prototype.insertCliente = function(table: string, values: Array<any>, next: Function) {
  
  this._connection.query(`INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error, rows) => {
    console.log("error", error)
    
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });

  this._connection.end();
};

MariasqlDAO.prototype.insertVeiculo = function(table: string, values: Array<any>, next: Function) {

  this._connection.query(`INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error, rows) => {
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });

 this._connection.end();
};

MariasqlDAO.prototype.insertApolice = function(table: string, values: Array<any>, next: Function) {

  this._connection.query(`INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error, rows) => {
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });
  this._connection.end();
};

MariasqlDAO.prototype.updateCliente = function(table: string, cod_entity: string, values: Array<any>, next: Function) {

  this._connection.query(`UPDATE ${table} SET nome=?, sobrenome=?, cpf=?, rg=?, dt_nascimento=?, logradouro=?, numero=?, bairro=?, cep=?, cidade=?, uf=?, complemento_endereco=?, genero=? WHERE cod_cliente=${cod_entity}`, values, (error, rows) => {
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });

  this._connection.end();
};

MariasqlDAO.prototype.updateVeiculo = function(table: string, cod_entity: string, values: Array<any>, next: Function) {

  this._connection.query(`UPDATE ${table} SET placa=?, chassi=?, marca=?, modelo=?, ano_fabricacao=?, cod_cliente=?, ano_modelo=? WHERE cod_veiculo=${cod_entity}`, values, (error, rows) => {
    if (error) {
      next(error, null);
    }

    next(null, rows);
  });

  this._connection.end();
};

MariasqlDAO.prototype.updateApolice = function(table: string, cod_entity: string, values: Array<any>, next: Function, fk_infos: any) {

  if ( fk_infos ) {
    
    if ( fk_infos.table === 'tbl_cliente' ) {

      this._connection.query(`UPDATE ${table} SET dt_emissao=?, dt_vigencia=?, seguradora=?, class_bonus=?, vl_franquia=?, vl_franquia_vidros=?, nome_arquivo=?, vl_premio_total=?, ativa=? WHERE cod_cliente=${fk_infos.fk}`, values, (error, rows) => {
        if (error) {
          next(error, null);
        }
    
        next(null, rows);
      });
      
    } else if ( fk_infos.table === 'tbl_veiculo' ) {

      this._connection.query(`UPDATE ${table} SET cod_veiculo=?, dt_emissao=?, dt_vigencia=?, seguradora=?, class_bonus=?, vl_franquia=?, vl_franquia_vidros=?, nome_arquivo=?, vl_premio_total=?, WHERE cod_veiculo=${fk_infos.fk}`, values, (error, rows) => {
        if (error) {
          next(error, null);
        }
    
        next(null, rows);
      });
      
    } else {
      next('There is no reference!', null);
    }

  } else {

    this._connection.query(`UPDATE ${table} SET cod_veiculo=?, dt_emissao=?, dt_vigencia=?, seguradora=?, class_bonus=?, vl_franquia=?, vl_franquia_vidros=?, nome_arquivo=?, vl_premio_total=?, WHERE cod_apolice=${cod_entity}`, values, (error, rows) => {
      if (error) {
        next(error, null);
      }
  
      next(null, rows);
    });

  }

  this._connection.end();
};


module.exports = MariasqlDAO;