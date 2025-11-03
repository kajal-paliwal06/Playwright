function recommendedCar(familySize, plannedDistanceToDrive){
    
    if(familySize <=4 && plannedDistanceToDrive < 200) {
        var car = "Tesla"
    } else if (familySize <=4 && plannedDistanceToDrive >= 200){
        car = "Toyota Camry"
    }else{
        car = "Minivan"
    }
    return car
}

var selectedCar = recommendedCar(4,199)
console.log(selectedCar)