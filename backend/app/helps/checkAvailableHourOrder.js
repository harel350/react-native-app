const checkAvailableHourOrder = (tablePerHour,sumOfPeople,startHour,finishHour)=>{
    
    startHour = parseFloat(startHour)
    finishHour = parseFloat(finishHour)
    sumOfPeople = parseInt(sumOfPeople)
    const hourOfOrder = tablePerHour.filter(item => (startHour<= item.hour && item.hour<=finishHour))
    const tableIsAvailablePerOrder = hourOfOrder[0].tableIsAvailable.map((item)=>checkTableForAllOrder(item,hourOfOrder)).filter(item=>item != undefined)
    
    
    const checkMaxPeople = hourOfOrder.find(item => item.maxPeople < sumOfPeople)
    
    if((checkMaxPeople == undefined) && (hourOfOrder.length == ((finishHour - startHour)*2+1) ) &&(tableIsAvailablePerOrder.length > 0)){
        return {Ok:true,text:'השעות שביקשת זמינות',tableIsAvailablePerOrder,tablePerHour}
    }
    return {Ok:false,text : 'לצערנו השעות שביקשת לא פנויות אנא נסה שעות אחרות', r : '1'}
}
const checkTableForAllOrder = (checkThisTable,hourOfOrder) => {
   
    const checkTableId = hourOfOrder.filter(item => item.tableIsAvailable.find(table => table == checkThisTable ))
    if(checkTableId.length == hourOfOrder.length)
    {
        
        return checkThisTable
    }
   
}

module.exports = checkAvailableHourOrder