
const { Router } = require('express')
const router = Router()
const pool = require('../../connectionDB');
const bodyParser = require('body-parser');
const errorHandle = require('../helps/ErrorHandle')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        console.log('the re', req.body)
        const x = 'nf'
        cb(null, x + file.originalname)
    }
})
const filterImage = (req,file,cb) => {
    console.log(file)
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const uplode = multer({
    storage: storage,
    limits:
    {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:filterImage
})







router.get('/:whoIsLogin', (req, res) => {
    pool.query(`SELECT * FROM FORM WHERE required = true AND ${req.params.whoIsLogin} = true`,
        (err, response) => {
            if (err) return console.error(err)
            res.json(response.rows)
        })
})

router.post('/test', uplode.single('testImage'), (req, res) => {
    console.log(req.body.name)
    res.json(req.file)
})












router.get('/loadCountry', (req, res) => {

    pool.query('SELECT idcountrycode,countryName,phonecode,languagecode[1] FROM countryCode WHERE idcountrycode<2 ',
        (err, response) => {
            if (err) return console.error(err)

            res.json(response.rows)
        })
})
//check if user existing
router.post('/login', bodyParser.json(), (req, res) => {

    let { username, password } = req.body

    pool.query(`SELECT idCustomer FROM customers
                WHERE username = $1 AND password = $2`,
        [username.value, password.value]
        ,
        (err, response) => {
            if (err) console.error(err)

            if (response.rows[0] == null) {
                res.json({ Ok: false, text: 'הסיסמא או שם המשתמש אינם נכונים' })
            }
            else {
                res.json({ Ok: true, text: 'greet' })
            }
        })

})
//Registration for new customer insert - username,password,email,phone,callingcode
router.post('/registration_customer', bodyParser.json(), (req, res) => {
    const { username, password, email, callingCode, number } = req.body
    pool.query(`INSERT INTO customers("contactName",email,"prefixNumber",phone)
    VALUES ($1,$2,$3,$4) RETURNING "idCustomer"`,
        [username.value, email.value, callingCode, number],
        (err, response) => {
            if (err) return console.error(err)
            else {
                pool.query(`INSERT INTO login("userName",password,"IsCustomer","customerId") 
                            VALUES($1,$2,$3,$4)`,
                    [username.value, password.value, true, response.rows[0].idCustomer],
                    (err, response) => {
                        if (err) return console.error(err)
                        else res.json({ Ok: true })
                    })
            }
        })

})
router.post('/registration_supplier', bodyParser.json(), (req, res) => {
    console.log('/registration_supplier', req.body)
    const { username, password, email, callingCode, number, privateCompanyNumber, postalCode, contactName, restaurantName } = req.body
    pool.query(`INSERT INTO suppliers("privateCompanyNumber",phone,"prefixNumber",email,"contactName","postalCode","restaurantName")
                VALUES($1,$2,$3,$4,$5,$6,$7)
                RETURNING "idSupplier"`,
        [privateCompanyNumber.value, number, callingCode, email.value, contactName.value, postalCode.value, restaurantName.value],
        (err, response) => {
            if (err) return console.error(err)
            else {
                pool.query(`INSERT INTO login("userName",password,"IsSupplier","supplierId") 
                            VALUES($1,$2,$3,$4)`,
                    [username.value, password.value, true, response.rows[0].idSupplier],
                    (err, response) => {
                        if (err) return console.error(err)
                        else res.json({ Ok: true })
                    })
            }
        })

})




module.exports = router