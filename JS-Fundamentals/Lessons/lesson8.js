//Functions
//Declarative function
funct1()
function funct1(){
    console.log("Hello world declarative")
}
funct1()

//Anonymous function
var funct2 = function(){
    console.log("Hello world anonymous")
}
funct2()

//ES6 syntax or arrow function
var func3 = () => {
    console.log("Hello world ES6")
}
func3()

//Function with Argument
function printName(name, lastName){
    console.log(name + " " +lastName)
}
printName("John", "Smith")

function multiplyby2(number){
    var result = number * 2
    return result
}
var myResult = multiplyby2(16)
console.log(myResult)

//Import functions
import { printAge } from "../Helper/printHelper.js"
printAge(10)

//Import everythig from helper
import * as helper from "../Helper/printHelper.js"
helper.printAge(50)