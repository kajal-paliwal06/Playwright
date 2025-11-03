// Loops
//for (statement1; statement2; statement3){
    //}
//for loop (for i loop)
for(let i=0; i<=5; i++){
    console.log("Hello World!")
}

//for of loop
var cars = ["Volvo", "Toyota", "Tata"]
for(let c of cars){
    console.log(c)
    if(c == "Toyota"){
        break
    }
}

//ES6 syntax for each loop
cars.forEach(c => {
    console.log(c)
})