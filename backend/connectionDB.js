const password = require('./passForDb')
const {Pool} = require('pg')

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'myAppDB',
    password : password.passwordForDb,
    port : 5432
   
})

module.exports = pool