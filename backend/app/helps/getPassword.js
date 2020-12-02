const getValidtionCode = () => {
    let number = Math.random() * 10000
    while(number < 1000){
        number +=1000
    }
    number = parseInt(number)
    const expirationTime = new Date().getTime()
    return {code : number,expirationTime}
}

module.exports = getValidtionCode