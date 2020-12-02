const takeThisTable = ( sumOfPeople, tableIsAvailablePerOrder) => {

    let table = tableIsAvailablePerOrder.find(item => parseInt(item / 1000) >= sumOfPeople)
    let tableArray = []
    let counterOfRound = 0
    //if the table in the first check isnt enough, we make combination of some table
    while (table == undefined) {
        //add new table to combination
        tableArray = tableArray.concat(tableIsAvailablePerOrder[counterOfRound])
        //remove the array of combination table from the general array's table
        const newA = tableIsAvailablePerOrder.filter(item => tableArray.filter(value => value == item).length == 0)
        table = newA.find((item) => {
            const combinationArray = tableArray.concat(item)
            return Tablecombination(combinationArray, sumOfPeople)
        })
        counterOfRound++
    }

    tableArray = tableArray.concat(table)
    return tableArray
}
//function that get array of combination table and how much people
//and return if the sum of the all table is enough
const Tablecombination = (tableNumberArray, sumOfPeople) => {
    const peoplePerTable = tableNumberArray.map(item => parseInt(item / 1000))
    const maxPeoplePerHour = peoplePerTable.reduce((accumulator, currentValue) => accumulator + currentValue)
    if (maxPeoplePerHour >= sumOfPeople) {
        return true
    }
    return false
}

module.exports = takeThisTable