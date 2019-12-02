const INPUT = require("./input1");

const parseInput = input => input.split("\n").map(str => parseInt(str, 10));

const caculateFuel = mass => Math.floor(mass / 3) - 2;

const calculateFuelForFuel = fuel => {
  const fuelForFuel = caculateFuel(fuel);

  if (fuelForFuel <= 0) {
    return 0;
  } else {
    return fuelForFuel + calculateFuelForFuel(fuelForFuel);
  }
};

const sum = (a, b) => a + b;

const calculateTotalModulesFuel = (input, fuelCalculator) => {
  const modulesMasses = parseInput(input);
  return modulesMasses.map(fuelCalculator).reduce(sum);
};

const calculateTotalFuelWithoutFuelForFuel = input =>
  calculateTotalModulesFuel(input, caculateFuel);

const calculateTotalFuelWithFuelForFuel = input =>
  calculateTotalModulesFuel(input, calculateFuelForFuel);

// Result
console.log(calculateTotalFuelWithoutFuelForFuel(INPUT));
console.log(calculateTotalFuelWithFuelForFuel(INPUT));
