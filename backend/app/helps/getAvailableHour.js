

const getAvailableHour = (data, tableData) => {
    const allHour = new Array(25).fill(12).map((item, index) => item + index * 0.5)

    const orderArray = data.map(item => {
        return {
            tableId: item.tableId,
            startHour: convertStringToHour(item.hourOfOrder),
            finishHour: convertStringToHour(item.hourOfFinish),
            people: item.sumOfPeople
        }
    })
    //loop all the hour and check what time is available
    console.log('order array')
    console.table(orderArray)
    let listOfAvailableHour = allHour.map((hour) => {
        return checkHour(hour, hour + 0.5, orderArray, tableData)
    }).filter(item => item.tableIsAvailable.length > 0)
    
    console.log('the list of available hour : ')
    console.table(listOfAvailableHour)
    return listOfAvailableHour

}

//check if specific hour available, return all table that available for this hour
const checkHour = (startHourChecking, finishHourChecking, orderArray, tableData) => {
    const allTableTaken = orderArray.map((item) => {
        const { startHour, finishHour } = item
        if (((startHour <= startHourChecking) && (finishHour > startHourChecking)) || ((startHour < finishHourChecking) && (finishHour > finishHourChecking))) {
            return { table: item.tableId, available: false }
        }
        return { table: item.tableId, available: true }
    })
    //filter only the table that not available and uniqu them
    const tableIsNotAvailable = allTableTaken.filter(item => !item.available)
    
    //extract the table from tableIsNotAvailable array and make them to one array
    const newA =tableIsNotAvailable.map(item => item.table)
    const newB = [].concat.apply([],newA)
    //filter only the table that not available  and uniqu them
    const tableIsAvailable = tableData.filter(item => newB.filter(value => value == item).length == 0)
    console.log('tableIsAvailable',tableIsAvailable)
    const peoplePerTable = tableIsAvailable.map(item => parseInt(item / 1000))
    const maxPeoplePerHour = peoplePerTable.reduce((accumulator, currentValue) => accumulator + currentValue)
    return { tableIsAvailable: tableIsAvailable, hour: startHourChecking, maxPeople: maxPeoplePerHour }

}
const convertStringToHour = (hour) => {
    let fullHour = parseInt(hour)
    if (fullHour == 0) {
        fullHour = 24
    }
    const halfHour = parseInt(hour[3])
    if (halfHour == 0) {
        return fullHour
    }
    else {
        return fullHour + 0.5
    }
}

module.exports = getAvailableHour












