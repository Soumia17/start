// adding event listener to the solve button
document.getElementById("solve").addEventListener("click", drawSolution);
// Global Variables
let canvas = document.querySelector("#my-canvas");
let context = canvas.getContext("2d");
let X_position = [80, 164, 250, 340, 420];
let Y_position = [84, 170, 255, 335, 420];
let taken;
let start_X;
let start_Y;
let goals_X;
let goals_Y;
let dangerPoints;
let bestPath = [];
let bestPathLength = 26; // initialized as the max (only 25 points)

function initialize() {
  taken = [];
  start_X = Math.floor(Math.random() * 5);
  start_Y = Math.floor(Math.random() * 5);
  taken.push(start_X + "-" + start_Y);

  goals_X = Math.floor(Math.random() * 5);
  goals_Y = Math.floor(Math.random() * 5);
  while (taken.includes(goals_X + "-" + goals_Y)){
    goals_X = Math.floor(Math.random() * 5);
    goals_Y = Math.floor(Math.random() * 5);
  }
  taken.push(goals_X + "-" + goals_Y);
  dangerPoints = [];
  let danger_X;
  let danger_Y;
  for (let i = 0; i < 5; ) {
    danger_X = Math.floor(Math.random() * 5);
    danger_Y = Math.floor(Math.random() * 5);
    if (!taken.includes(danger_X + "-" + danger_Y)) {
      taken.push(danger_X + "-" + danger_Y);
      dangerPoints.push([danger_X, danger_Y]);
      i++;
    }
  }
  drawPoints();
}
// draw a single point function
function drawPoint(x, y, label, color, size) {
  var radius = 0.5 * size;

  // to increase smoothing for numbers with decimal part
  var pointX = Math.round(x - radius);
  var pointY = Math.round(y - radius);

  context.beginPath();
  context.fillStyle = color;
  context.fillRect(pointX, pointY, size, size);
  context.fill();

  if (label) {
    var textX = Math.round(x);
    var textY = Math.round(pointY - 5);

    context.font = "bold 16px Arial";
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(label, textX, textY);
  }
}
// draw all the points function

function drawPoints() {
  // draw black points
  for (let i = 0; i < X_position.length; i++) {
    for (let j = 0; j < X_position.length; j++) {
      drawPoint(X_position[i], Y_position[j], "", "black", 14);
    }
  }
  //  start index
  drawPoint(X_position[start_X], Y_position[start_Y], "Start", "#ffba6b", 16);

  //goals index
  drawPoint(X_position[goals_X], Y_position[goals_Y], "End", "#6be38b", 16);

  //danger index
  for (let i = 0; i < 5; i++) {
    drawPoint(
      X_position[dangerPoints[i][0]],
      Y_position[dangerPoints[i][1]],
      "👹",
      "purple",
      14
    );
  }

  // remove the ending point cause we draw a line to it and leave the rest of them
  taken.splice(1, 1);
}

function findSolution(
  startingPoint,
  endingPoint,
  forbiddenPoints,
  path,
  pathLength = 0
) {
  if (
    startingPoint[0] == endingPoint[0] &&
    startingPoint[1] == endingPoint[1]
  ) {
    if (pathLength < bestPathLength) {
      bestPathLength = pathLength;
      bestPath = [];
      for (let i = 0; i < path.length; i++) bestPath[i] = path[i].slice();
    }
    return;
  }
  let possibleNeighbors = [];
  if (
    startingPoint[0] != 0 &&
    !forbiddenPoints.includes(startingPoint[0] - 1 + "-" + startingPoint[1])
  )
    possibleNeighbors.push([startingPoint[0] - 1, startingPoint[1]]);
  if (
    startingPoint[0] != 4 &&
    !forbiddenPoints.includes(startingPoint[0] + 1 + "-" + startingPoint[1])
  )
    possibleNeighbors.push([startingPoint[0] + 1, startingPoint[1]]);
  if (
    startingPoint[1] != 0 &&
    !forbiddenPoints.includes(startingPoint[0] + "-" + (startingPoint[1] - 1))
  )
    possibleNeighbors.push([startingPoint[0], startingPoint[1] - 1]);
  if (
    startingPoint[1] != 4 &&
    !forbiddenPoints.includes(startingPoint[0] + "-" + (startingPoint[1] + 1))
  )
    possibleNeighbors.push([startingPoint[0], startingPoint[1] + 1]);

  for (let i = 0; i < possibleNeighbors.length; i++) {
    // make choice
    taken.push(possibleNeighbors[i][0] + "-" + possibleNeighbors[i][1]);
    // add point to the path
    path.push(possibleNeighbors[i]);
    pathLength++;
    // call function with choice made
    findSolution(possibleNeighbors[i], endingPoint, taken, path, pathLength);
    // undo choice
    // delete path to that point
    path.pop();
    taken.pop();
    pathLength--;
  }
}
function drawSolution() {
  findSolution([start_X, start_Y], [goals_X, goals_Y], taken, [
    [start_X, start_Y],
  ]);
  drawPath(bestPath);
}
function drawPath(path = bestPath) {
  for (let i = 0; i < path.length - 1; i++) {
    drawStep(path[i], path[i + 1]);
  }
}
function drawStep(from, to) {
  context.beginPath();
  context.moveTo(X_position[from[0]], Y_position[from[1]]);
  context.lineTo(X_position[to[0]], Y_position[to[1]]);
  context.strokeStyle = "#07e6d3";
  context.lineWidth = "4";
  context.stroke();
  drawPoint(X_position[from[0]], Y_position[from[1]], "", "#07e6d3", 8);
  drawPoint(X_position[to[0]], Y_position[to[1]], "", "#07e6d3", 8);
}
initialize();
