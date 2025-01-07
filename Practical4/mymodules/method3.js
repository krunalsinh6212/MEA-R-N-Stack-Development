const areaofrectangle = (length, breath) => {
    return length*breath;
}

const areaofcircle = (radious) => {
    return 3.14*radious*radious;
}

const areaofsquare = (side) => {
    return side*side;
}

const areaoftriangle = (side1, side2, side3) => {
    const value = (side1 + side2 + side3)/2;
    return Math.sqrt((value  * (value-side1) * (value-side2) * (value-side3)));
}

module.exports = {
    areaofrectangle, areaofcircle, areaofsquare, areaoftriangle
}