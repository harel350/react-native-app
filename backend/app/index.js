const express = require('express')
const form = require('./api/Form')
const mail = require('./api/sendMail')
const info = require('./api/Info')
const orderTable = require('./api/orderTable')


const app = express()


app.use('/form',form)
app.use('/images',express.static('images'))
app.use('/mail',mail)
app.use('/info',info)
app.use('/orderTable',orderTable)


module.exports = app