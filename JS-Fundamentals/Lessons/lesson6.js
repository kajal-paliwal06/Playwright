//Conditional Statements
//if (Condition){
    //execute some code here
//} else {
    //execute some code here
//}

//If hour between 6 and 12 print "Good Morning"
//If hour between 12 and 18 print "Good Afternoon"
//Otherwise: Good Evening

var hour = 17

if (hour >=6 && hour < 12) {
    console.log("Good Morning")
} else if (hour >=12 && hour <= 18){
    console.log("Good Afternoon")
}else {
    console.log("Good Evening")
}