const geometry = require('./mymodules/method4')

console.log('Area of square :', geometry.areaofsquare(10));
console.log('Area of rectangle :', geometry.areaofrectangle(10, 20));
console.log('Area of circle :', geometry.areaofcircle(10));
console.log("Area of triangle :", geometry.areaoftriangle(15, 10, 15));
console.log("Volume of cube :", geometry.volumeofcube(10));
console.log("Surface area of cube :", geometry.surfaceareaofcube(10));
console.log("Volume of cuboid :", geometry.volumeofcuboid(10, 20, 30));
console.log("Surface area of cuboid :", geometry.surfaceareaofcuboid(10, 20, 30));
console.log("Volume of sphere :", geometry.volumeofsphere(10));
console.log("Surface area of sphere :", geometry.surfaceareaofsphere(10));
console.log("Surface area of cylinder :", geometry.surfaceareaofcylinder(10, 20));
console.log("Volume of cylinder :", geometry.volumeofcylinder(10, 20));
console.log("Volume of cone :", geometry.volumeofcone(10, 20));
console.log("Surface area of cone :", geometry.surfaceareaofcone(10, 15));
console.log("Volume of pyramid :", geometry.volumeofpyramid(100, 30));
console.log("Surface area of pyramid :", geometry.surfaceareaofpyramid(60, 15, 100));
console.log("Volume of ellipsoid :", geometry.volumeofellipsoid(10, 15, 20));
console.log("Surface area of ellipsoid :", geometry.surfaceareaofellipsoid(10, 15, 20));
