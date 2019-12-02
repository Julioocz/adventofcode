const INPUT = require("./input2");

const createOperation = combiner => (initialIndex, intcode) => {
  const position1 = intcode[initialIndex];
  const position2 = intcode[initialIndex + 1];
  const resultPosition = intcode[initialIndex + 2];
  intcode[resultPosition] = combiner(intcode[position1], intcode[position2]);
};

const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;
const sumOperation = createOperation(sum);
const multiplyOperation = createOperation(multiply);

const parseInput = input => input.split(",").map(val => parseInt(val, 10));

const computer = intcode => {
  index = 0;
  while (index < intcode.length) {
    let optCode = intcode[index];
    switch (optCode) {
      case 1:
        sumOperation(index + 1, intcode);
        index += 4;
        continue;
      case 2:
        multiplyOperation(index + 1, intcode);
        index += 4;
        continue;
      case 99:
        return intcode;
      default:
        throw new Error();
    }
  }
  return intcode;
};

// First part
const input = parseInput(INPUT);
input[1] = 12;
input[2] = 2;
console.log("First Part:", computer(input)[0]);

// Second part
// Finding rersult for second part using brute force
const initial = parseInput(INPUT);
for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    const input = [...initial];
    input[1] = i;
    input[2] = j;
    const result = computer(input)[0];
    if (result === 19690720) {
      console.log("Second Part:", i, j);
    }
  }
}
