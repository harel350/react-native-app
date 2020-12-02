const {Pool} = require('pg')

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'myAppDB',
    password : 'Q1w2e3r4',
    port : 5432
   
})

module.exports = pool