const { Router } = require('express');
const router = Router()
const bodyParser = require('body-parser');
const pool = require('../../connectionDB');

router.get('/restaurant', (req, res) => {
    pool.query('SELECT * FROM restaurant', (err, response) => {
        res.json(response.rows)

    })
})
router.get('/searchRestaurant/:search', (req, res) => {
    pool.query(`SELECT "restaurantName","restaurantPhone","restaurantAddress","tableOfSeats" from restaurant
        WHERE "restaurantName" LIKE '${req.params.search}%'
        LIMIT 2`, (err, response) => {
        if (err) return console.error(err)

        res.json(response.rows)
    })
})
router.get('/myOrder', (req, res) => {
    pool.query(`SELECT "orderId", "dateOfOrder","hourOfOrder","hourOfFinish","sumOfPeople","totalPay","currency",r."restaurantName" FROM order_reservation 
                JOIN restaurant AS r ON order_reservation."idRestaurant" = r."idRestaurant"`,
        (err, response) => {
            if (err) return console.error(err)
            res.json(response.rows)
        })
})


module.exports = router