const metaConf = require('../../meta-conf')
const mysql = require('mysql')


let worker = {
  pool: null,

  getPool: () => {
    if (worker.pool)
      return worker.pool

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
}

/*
connection.connect()
connection.query('SELECT * FROM x_t_joke', (error, results, fields) => {
  if (error)
    throw error

  results.forEach(result => {
    console.log(result)
    console.log(result.id)
  })
})

connection.end()
*/

module.exports = {
  getPool: worker.getPool,
  endPool: worker.endPool,
}

