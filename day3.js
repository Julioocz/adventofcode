const INPUT = require("./input3");

const taxicabDistance = (point1, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const closestIntersectionDistance = intersections => {
  const center = [0, 0];
  const distances = intersections.map(interception =>
    taxicabDistance(center, interception)
  );
  return Math.min(...distances);
};

const serializeArray = array => array.join(",");

const findInterceptions = (positions1, positions2) => {
  const positionsSet = new Set(positions1.map(serializeArray));
  return positions2.filter(position =>
    positionsSet.has(serializeArray(position))
  );
};

const serialArray = (start, length) =>
  [...Array(length)].map((_, index) => start + index);

const createPositionsList = movements => {
  let x = 0;
  let y = 0;
  let positions = [];
  for (let movement of movements) {
    const direction = movement[0];
    const distance = parseInt(movement.slice(1), 10);
    let newPositions;
    const distanceIntSerie = serialArray(1, distance);
    switch (direction) {
      case "U":
        newPositions = distanceIntSerie.map(i => [x, i + y]);
        y += distance;
        break;
      case "R":
        newPositions = distanceIntSerie.map(i => [x + i, y]);
        x += distance;
        break;
      case "D":
        newPositions = distanceIntSerie.map(i => [x, y - i]);
        y -= distance;
        break;
      case "L":
        newPositions = distanceIntSerie.map(i => [x - i, y]);
        x -= distance;
        break;
      default:
        throw new Error("Invalid movement");
    }

    positions = positions.concat(newPositions);
  }

  return positions;
};

const parseInput = input =>
  input.split("\n").map(wireInput => wireInput.split(","));

const findClosestIntersection = input => {
  const [firstMovements, secondMovements] = parseInput(input);
  const firstPositions = createPositionsList(firstMovements);
  const secondPositions = createPositionsList(secondMovements);
  const intersections = findInterceptions(firstPositions, secondPositions);
  return closestIntersectionDistance(intersections);
};

//console.log("Result 1", findClosestIntersection(INPUT));

// Part 2
const indexArrayForIndex = array =>
  array.reduce((obj, current, index) => {
    if (!obj.hasOwnProperty(current)) {
      obj[current] = index;
    }
    return obj;
  }, {});

const findClosestIntersectionBySteps = input => {
  const [firstMovements, secondMovements] = parseInput(input);
  const firstPositions = createPositionsList(firstMovements);
  const secondPositions = createPositionsList(secondMovements);
  const intersections = findInterceptions(firstPositions, secondPositions);
  const firstPositionsStrings = firstPositions.map(serializeArray);
  const secondPositionsStrings = secondPositions.map(serializeArray);
  const interceptionsStrings = intersections.map(serializeArray);
  const indexedFirstPositionsStringsIndex = indexArrayForIndex(
    firstPositionsStrings
  );
  const indexedSecondPositionsStringsIndex = indexArrayForIndex(
    secondPositionsStrings
  );
  const stepsDistance = interceptionsStrings.map(
    interception =>
      indexedFirstPositionsStringsIndex[interception] +
      indexedSecondPositionsStringsIndex[interception] +
      2 // index starts at 0
  );
  return Math.min(...stepsDistance);
};

console.log("Result:", findClosestIntersectionBySteps(INPUT));
