const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASS,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}
