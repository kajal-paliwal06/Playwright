//Logical operators
//And
console.log(true && false) //All values have to be true for expression to be true

//Or
console.log(true || false) //Any values have to be true for expression to be true

var ageIsMoreThanEighteen = true
var isUSCitizen = true

var eligibilityForDL = ageIsMoreThanEighteen && isUSCitizen
console.log('This customer is eligible for DL: ' +eligibilityForDL)

//LogicalNot
// console.log(!true)
console.log(6 !==10)