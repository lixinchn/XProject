const metaConf = require('../../meta-conf')
const mysql = require('mysql')


let worker = {
  pool: null,

  getPool: () => {
    if (worker.pool) {
      console.log('in pool')
      return worker.pool
    }

    worker.pool = mysql.createPool({
      host: metaConf.db.host,
      user: metaConf.db.user,
      password: metaConf.db.password,
      database: metaConf.db.database,
    })
    return worker.pool
  },

  endPool: () => {
    worker.pool.end(err => {
      if (err)
        console.log(err)
    })
  },

  generateSql: {
    getById: (column, tableName, idColumn) => {
      let select = column.join(',')
      return 'SELECT ' + column + ' FROM ' + tableName + ' WHERE ' + idColumn + ' = ?;'
    },
  },
}

module.exports = {
  getPool: worker.getPool,
  endPool: worker.endPool,
  generateSql: worker.generateSql,
}

