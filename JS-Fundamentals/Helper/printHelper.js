export function printAge(age){
    console.log(age)
}

class CustomerDetails{
    printFirstName(firstName){
        console.log(firstName)
    }
    /**
     * This method will print the lastName
     * @param {lastName} lastName 
     */
    printLastName(lastName){
        console.log(lastName)
    }
}

export const custDetails = new CustomerDetails()