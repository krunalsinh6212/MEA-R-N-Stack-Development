exports.areaofsquare = function(side) {
    return side*side;
} 

exports.areaofrectangle = function(length, breath) {
    return length*breath;
}
exports.areaofcircle = function(radious) {
    return 3.14*radious*radious;
}

exports.areaoftriangle = function(side1, side2, side3) {
    const value = (side1 + side2 + side3)/2;
    return Math.sqrt((value  * (value-side1) * (value-side2) * (value-side3)));
}