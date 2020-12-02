
export const getFormField = (formKey,data) => {
        let formData = data.filter(field => field.formkey.find(x => x == formKey))
        formData.sort((a,b)=>{
               return a.priority - b.priority
        })

        return formData
}
export const checkID = (idNUmber) => {
        const idNumber = idNUmber.toString()
        const array = idNumber.split('')
       if(array.length !== 9){
                return false
        }
        
        const mapArray = array.map((x,index)=>{
                if(index % 2 == 0){
                        return x*1
                }
                else{
                       let number = x*2
                       if(number > 9){
                        let digitNumber = number % 10
                        number = digitNumber + 1
                       }
                       return number
                }
        })
        const finalNumber = mapArray.reduce((accumulator, currentValue) => accumulator + currentValue)
        if(finalNumber % 10 == 0 && Math.floor(idNUmber/10000000) == 51){
               return true
        }
        
               return false
       
        
}

