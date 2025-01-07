const areaofrectangle = (length, breath) => {
    return length * breath;
  };
  
  const areaofcircle = (radius) => {
    return 3.14 * radius * radius;
  };
  
  const areaofsquare = (side) => {
    return side * side;
  };
  
  const areaoftriangle = (side1, side2, side3) => {
    const value = (side1 + side2 + side3) / 2;
    return Math.sqrt(value * (value - side1) * (value - side2) * (value - side3));
  };
  
  const volumeofcube = (side) => {
    return Math.pow(side, 3);
  };
  
  const surfaceareaofcube = (side) => {
    return 6 * side * side;
  };
  
  const volumeofcuboid = (length, width, height) => {
    return length * width * height;
  };
  
  const surfaceareaofcuboid = (length, width, height) => {
    return 2 * (length * width + width * height + height * length);
  };
  
  const volumeofsphere = (radius) => {
    return (4 / 3) * Math.PI * Math.pow(radius, 3);
  };
  
  const surfaceareaofsphere = (radius) => {
    return 4 * Math.PI * Math.pow(radius, 2);
  };
  
  const surfaceareaofcylinder = (radius, height) => {
    return 2 * Math.PI * radius * (radius + height);
  };
  
  const volumeofcylinder = (radius, height) => {
    return Math.PI * Math.pow(radius, 2) * height;
  };
  
  const volumeofcone = (radius, height) => {
    return (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
  };
  
  const surfaceareaofcone = (radius, slantHeight) => {
    return Math.PI * radius * (radius + slantHeight);
  };
  
  const volumeofpyramid = (baseArea, height) => {
    return (1 / 3) * baseArea * height;
  };
  
  const surfaceareaofpyramid = (basePerimeter, slantHeight, baseArea) => {
    return (1 / 2) * basePerimeter * slantHeight + baseArea;
  };
  
  const volumeofellipsoid = (radius1, radius2, radius3) => {
    return (4 / 3) * Math.PI * radius1 * radius2 * radius3;
  };
  
  const surfaceareaofellipsoid = (radius1, radius2, radius3) => {
    const p = 1.6075;
    return 4 * Math.PI * Math.pow(
      (Math.pow(radius1 * radius2, p) + Math.pow(radius1 * radius3, p) + Math.pow(radius2 * radius3, p)) / 3,
      1 / p
    );
  };
  
  module.exports = {
    areaofrectangle,
    areaofcircle,
    areaofsquare,
    areaoftriangle,
    volumeofcube,
    surfaceareaofcube,
    volumeofcuboid,
    surfaceareaofcuboid,
    volumeofsphere,
    surfaceareaofsphere,
    surfaceareaofcylinder,
    volumeofcylinder,
    volumeofcone,
    surfaceareaofcone,
    volumeofpyramid,
    surfaceareaofpyramid,
    volumeofellipsoid,
    surfaceareaofellipsoid
  };