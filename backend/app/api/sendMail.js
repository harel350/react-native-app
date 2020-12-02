var nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router()
const pool = require('../../connectionDB');
const bodyParser = require('body-parser');
const getValidtionCode = require('../helps/getPassword')


const sendMailHandle = async (message, emailAddress) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harel2351@gmail.com',
            pass: 'nmfydthzjpocnvgc'
        }
    });
    var mailOptions = {
        from: 'testsmyapp@gmail.com',
        to: emailAddress,
        subject: message.subject,
        text: message.text
    };
    const promise1 = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('error log', error);
                reject('no')
            } else {
                console.log('Email sent: ' + info.response);
                resolve({ Ok: true })
            }
        })
    })

    const response = await promise1
    return response
}

//send mail to user with code, valid if to the user have approach to email
router.post('/registEmail/:whoIsLogin', bodyParser.json(), (req, res) => {
    console.log('the req',req.body)
    let email = req.body.email.value
    let validCode = getValidtionCode()
    let columnName = 'idCustomer'
    let tableName = 'customers'
    if(req.params.whoIsLogin === 'supplier'){
        columnName = 'idSupplier'
        tableName = 'suppliers'
    }
    pool.query(`SELECT "${columnName}" FROM ${tableName} WHERE email = $1`,
        [email],
        async (err, response) => {
            if (err) return console.error(err)
            else {
                if (response.rows.length == 0) {
                    var message = {
                        subject: 'Verify email',
                        text: `the password is : ${validCode.code} `
                    }
                    const emailResponse = await sendMailHandle(message, email)
                    if (emailResponse.Ok) {
                        res.json({ Ok: true,data:req.body, text: 'the mail is send', code: validCode.code, expirationTime: validCode.expirationTime })
                    }
                    else {
                        res.json({ Ok: false, text: 'the mail isnt send' })
                    }
                }
                else{
                    res.json({Ok:false,text:'your mail exist, please enter other mail'})
                }
            }



        })
})
//send mail with new password
router.post('/passwordRecovery', bodyParser.json(), (req, res) => {
    let email = req.body.email.value
    pool.query(`SELECT idcustomer FROM customers WHERE email=$1`, [email],
        (err, response) => {
            if (err) return console.error('error', error)
            else {
                if (response.rows.length > 0) {
                    let password = 'hH123456'
                    pool.query(`UPDATE customers SET password = $1 WHERE email = $2`,
                        [password, email],
                        async (err, response) => {
                            if (err) return console.error(error)

                            var message = {
                                subject: 'password recovery',
                                text: `your new password is ${password}`
                            }
                            const emailResponse = await sendMailHandle(message, email)

                            if (emailResponse.Ok) {
                                res.json({ Ok: true, text: 'the email sent' })
                            }
                            else {
                                res.json({ Ok: false, text: 'error' })
                            }

                        })
                }
            }
        })

})


module.exports = router