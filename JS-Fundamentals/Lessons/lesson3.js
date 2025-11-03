//Objects
var customers = {
    firstName:'Kajal',
    lastName: 'Paliwal',
    cars: ["Volvo", "Toyota", "Tata"]
}
//Dot Notation
console.log(customers.firstName)
console.log(customers['lastName'])

customers.firstName = "Mike"
customers[('lastName')] = "Silver"

console.log(`${customers.firstName} ${customers.lastName}`)

//Arrays
var cars = ["Volvo", "Toyota", "Tata"]
console.log(cars[1])
cars[1] = "BMW"
console.log(cars[1])
console.log(customers.cars[0])

