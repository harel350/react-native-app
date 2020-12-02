
const { Router } = require('express');
const router = Router()
const bodyParser = require('body-parser');
const pool = require('../../connectionDB');
const getAvailableHour = require('../helps/getAvailableHour')
const checkAvailableHourOrder = require('../helps/checkAvailableHourOrder')
const takeThisTable = require('../helps/takeThisTable')



router.post('/getAvailableHour/:restaurantName', bodyParser.json(), (req, res) => {
    const { date, sumOfPeople, startHour, finishHour,tableData } = req.body
    
    pool.query(`SELECT "hourOfOrder","hourOfFinish","sumOfPeople","tableId",r."restaurantOpeningHours",r."tableOfSeats"
                FROM order_reservation
                JOIN restaurant AS r ON order_reservation."idRestaurant" = r."idRestaurant"
                WHERE r."restaurantName" = '${req.params.restaurantName}' AND "dateOfOrder"='${date}'  `,
        (err, response) => {
            if (err) return console.error(err)
            console.table(response.rows)
            
            const tablePerHour = getAvailableHour(response.rows, tableData)
            const result = checkAvailableHourOrder(tablePerHour, sumOfPeople, startHour, finishHour)

            res.json(result)

        })
})

router.post('/newOrder/:idRestaurant', bodyParser.json(), (req, res) => {

    const { date, sumOfPeople, startHour, finishHour, tablePerHour } = req.body
    pool.query(`SELECT "idRestaurant","tableOfSeats" FROM restaurant WHERE "restaurantName" = $1`, [req.params.idRestaurant]
        , (err, response) => {
            if (err) return console.error(err)
            const idRest = response.rows[0].idRestaurant
            const result = checkAvailableHourOrder(tablePerHour, sumOfPeople, startHour, finishHour)
            if (!result.Ok) {
                res.json('error')
            }
            const table = takeThisTable(sumOfPeople,result.tableIsAvailablePerOrder)
            console.log(startHour, finishHour)
            pool.query(`INSERT INTO order_reservation("dateOfOrder","hourOfOrder","hourOfFinish","sumOfPeople","tableId","idRestaurant")
                VALUES($1,time '${startHour}',time '${finishHour}',$2,$3,$4) RETURNING "orderId"` ,
                [date,sumOfPeople, table, idRest],
                (err, response) => {
                    if (err) return console.error(err)
                    res.json('succses')
                })
            
        })


})

router.post('/test',bodyParser.json(), (req, res)=>{
    const { date, sumOfPeople, startHour, finishHour,tableData } = req.body
    const table = takeThisTable(date, sumOfPeople, startHour, finishHour,tableData)
    res.json(table)
})



module.exports = router