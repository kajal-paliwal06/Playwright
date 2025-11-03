//Concatination and Interpolation
var price = 50
var itemName = "cup"
var messageToPrint = "The price for your "+itemName+ " is "+price+ "$" //Concatination
var messageToPrint2 = `The price for your ${itemName} is ${price}$` //Interpolation
console.log(messageToPrint)
console.log(messageToPrint2)