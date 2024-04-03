import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { cell } from "../Grid/Walls";

function AStar(props) {
  let aStart = props.aGrid[0][0];
  aStart.g = 0;
  aStart.h = 0;
  aStart.f = 0;

  let aEnd = props.aGrid[62][89];

  //1800
  //900
  const walls = props.walls;

  if (walls.includes(aStart)) {
    walls.splice(walls.indexOf(aStart), 1);
  }
  if (walls.includes(aEnd)) {
    walls.splice(walls.indexOf(aEnd), 1);
  }

  const [openList, setOpenList] = useState([aStart]);
  const [closedList, setClosedList] = useState([...walls]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [theCurrent, setCurrent] = useState([aStart]);

  function animateAStar() {
    console.log("OpenList" + openList);
    if (openList.length === 0) {
      // No elements in openList, animation cannot proceed
      setIsRunning(false);
      return;
    }

    let current = openList.reduce((min, point) =>
      point.f < min.f ? point : min
    );
    setCurrent(current);
    //let current = checkForLowestF();
    // closedList.push(current);
    if (current === aEnd) {
      // Path found
      let temp = current;
      let newPath = [temp];
      while (temp.parent) {
        temp = temp.parent;
        newPath.unshift(temp);
      }
      setPath(newPath);
      setIsRunning(false); // Stop the animation when the path is found
      return;
    }
    openList.splice(openList.indexOf(current), 1);

    let successors = get_neighbors(
      current.row * props.aGrid[0].length + current.col
    );

    for (let successor of successors) {
      console.log(
        "Successors of current[" + current.row,
        current.col + "] :=" + successor.row,
        successor.col
      );
      if (!closedList.includes(successor)) {
        let tempG = current.g + 1;
        if (tempG < successor.g) {
          successor.g = tempG;
          successor.h = manhattanDistance(successor, aEnd);
          successor.f = successor.g + successor.h;
          successor.parent = current;
          props.aGrid[successor.row][successor.col] = successor;
          if (!openList.includes(successor)) {
            openList.push(successor);
          }
        }
      }
    }
    closedList.push(current);

    // Update the state using the setter functions
    setOpenList([...openList]);
    setClosedList([...closedList]);
    // console.log(openList);
  }
  //console.log("The After" + openList);
  useEffect(() => {
    if (isRunning) {
      const animationTimer = setInterval(animateAStar, 0); // Adjust the delay (in milliseconds) as needed
      return () => clearInterval(animationTimer);
    }
  }, [isRunning, openList, closedList, path]);

  function runOneStep() {
    if (!openList.length || isRunning) return;
    animateAStar();
  }

  function toggleAnimation() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  const items = props.aGrid.map((row, i) =>
    row.map((col, j) => {
      const cell = props.aGrid[i][j];
      const isCurrent = props.aGrid[i][j] === theCurrent;
      const isStart = cell === aStart;
      const isEnd = cell === aEnd;
      const isInClosedList = closedList.includes(cell);
      const isInOpenList = openList.includes(cell);
      const isPath = path.includes(cell);
      const isWall = walls.includes(cell);

      return (
        <Grid
          item
          key={j}
          style={{
            width: "10px", // Increased width to accommodate cell information
            height: "10px", // Increased height to accommodate cell information
            //border: "1px solid black",
            backgroundColor: isCurrent
              ? "pink"
              : isStart
              ? "green"
              : isEnd
              ? "red"
              : isPath
              ? "blue"
              : isInOpenList
              ? "lightblue"
              : isWall
              ? "black"
              : isInClosedList
              ? "purple"
              : "white",
            fontSize: "13px", // Adjust the font size as needed
            display: "flex",
            //padding: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {
            // /**cell info ->*/ `row=${cell.row} col=${cell.col} g=${cell.g} h=${cell.h} f=${cell.f}`
          }{" "}
        </Grid>
      );
    })
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleAnimation}>
        {isRunning ? "Stop Animation" : "Start Animation"}
      </Button>
      <Button variant="contained" color="primary" onClick={runOneStep}>
        Run One Step
      </Button>

      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {items.map((row, i) => (
          <Grid
            container
            spacing={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {row}
          </Grid>
        ))}
      </Grid>
    </div>
  );

  function get_neighbors(pos) {
    // Extracting the dimensions of the grid from the props object
    let length = props.aGrid.length;
    let width = props.aGrid[0].length;
    // Initialize an empty array to store the neighbors of the current position
    let neighbors = [];

    // Check if there is a neighbor to the right
    if (pos % width !== width - 1) {
      let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor to the left
    if (pos % width !== 0) {
      let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor above
    if (pos >= width) {
      let gridPos = [(pos - width) % width, Math.floor((pos - width) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor below
    if (pos < length * width - width) {
      let gridPos = [(pos + width) % width, Math.floor((pos + width) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Return the array of neighbors
    return neighbors;
  }

  function get_Neighbors(pos) {
    // Extracting the dimensions of the grid from the props object
    let length = props.aGrid.length;
    let width = props.aGrid[0].length;
    // Initialize an empty array to store the neighbors of the current position
    let neighbors = [];

    // Check if there is a neighbor to the right
    if (pos % width !== width - 1) {
      let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor to the left
    if (pos % width !== 0) {
      let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor above
    if (pos >= width) {
      let gridPos = [(pos - width) % width, Math.floor((pos - width) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor below
    if (pos < length * width - width) {
      let gridPos = [(pos + width) % width, Math.floor((pos + width) / width)];
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!closedList.includes(props.aGrid[gridPos[1]][gridPos[0]])) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(props.aGrid[gridPos[1]][gridPos[0]]);
      }
    }

    // Check if there is a neighbor in the top-left diagonal
    if (pos % width !== 0 && pos >= width) {
      let topLeftNeighbor = [
        (pos - width - 1) % width,
        Math.floor((pos - width - 1) / width),
      ];
      if (
        !closedList.includes(
          props.aGrid[topLeftNeighbor[1]][topLeftNeighbor[0]]
        )
      ) {
        neighbors.push(props.aGrid[topLeftNeighbor[1]][topLeftNeighbor[0]]);
      }
    }

    // Check if there is a neighbor in the top-right diagonal
    if (pos % width !== width - 1 && pos >= width) {
      let topRightNeighbor = [
        (pos - width + 1) % width,
        Math.floor((pos - width + 1) / width),
      ];
      if (
        !closedList.includes(
          props.aGrid[topRightNeighbor[1]][topRightNeighbor[0]]
        )
      ) {
        neighbors.push(props.aGrid[topRightNeighbor[1]][topRightNeighbor[0]]);
      }
    }

    // Check if there is a neighbor in the bottom-left diagonal
    if (pos % width !== 0 && pos < length * width - width) {
      let bottomLeftNeighbor = [
        (pos + width - 1) % width,
        Math.floor((pos + width - 1) / width),
      ];
      if (
        !closedList.includes(
          props.aGrid[bottomLeftNeighbor[1]][bottomLeftNeighbor[0]]
        )
      ) {
        neighbors.push(
          props.aGrid[bottomLeftNeighbor[1]][bottomLeftNeighbor[0]]
        );
      }
    }

    // Check if there is a neighbor in the bottom-right diagonal
    if (pos % width !== width - 1 && pos < length * width - width) {
      let bottomRightNeighbor = [
        (pos + width + 1) % width,
        Math.floor((pos + width + 1) / width),
      ];
      if (
        !closedList.includes(
          props.aGrid[bottomRightNeighbor[1]][bottomRightNeighbor[0]]
        )
      ) {
        neighbors.push(
          props.aGrid[bottomRightNeighbor[1]][bottomRightNeighbor[0]]
        );
      }
    }

    // Return the array of neighbors
    return neighbors;
  }
}

export default AStar;

function manhattanDistance(point1, point2) {
  let dx = Math.abs(point1.row - point2.row);
  let dy = Math.abs(point1.col - point2.col);

  return dx + dy;
}
function euclideanDistance(point1, point2) {
  let dx = point1.row - point2.row;
  let dy = point1.col - point2.col;

  return Math.sqrt(dx * dx + dy * dy);
}

/*import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { cell } from "../Grid/Walls";

let aGrid = Array.from({ length: 5 }, (row, i) =>
  Array.from({ length: 5 }, (col, j) => {
    // Create a new object that inherits from gridCell
    let newCell = Object.create(cell);
    // Assign the row and col properties to the new cell
    newCell.row = i;
    newCell.col = j;
    newCell.h = 0;
    newCell.f = 0;
    newCell.j = 0;
    newCell.parent = undefined;

    // Return the new cell
    return newCell;
  })
);
let aStart = aGrid[0][0];
let aEnd = aGrid[1][4];

function AStar() {
  const [openList, setOpenList] = useState([aStart]);
  const [closedList, setClosedList] = useState([]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  function checkForLowestF() {
    let lowest = Object.create(cell);
    lowest.f = 1000000000000;
    for (let item of openList) {
      if (item.f < lowest.f) {
        lowest = item;
      }
    }
    return lowest;
  }
  function animateAStar() {
    let current = checkForLowestF(); //openList.reduce((min, point) => point.f < min.f ? point : min);
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);
    if (current === aEnd) {
      // Path found
      let temp = current;
      let newPath = [temp];
      while (temp.parent) {
        temp = temp.parent;
        newPath.unshift(temp);
      }
      setPath(newPath);
      setIsRunning(false); // Stop the animation when the path is found
      return;
    } //else {
    let successors = get_neighbors(current.row * aGrid[0].length + current.col);
    for (let successor of successors) {
      if (!closedList.includes(successor)) {
        let tempG = current.g + 1;

        if (openList.includes(successor)) {
          if (tempG < successor.g) {
            successor.g = tempG;
          } else {
            successor.g = tempG;
            openList.push(successor);
          }
          successor.h = manhattanDistance(successor, aEnd);
          successor.f = successor.g + successor.h;
          successor.parent = current;
        }
      }

      //
    }
    // }
    // Update the state using the setter functions
    setOpenList([...openList]);
    setClosedList([...closedList]);
  }

  useEffect(() => {
    if (isRunning) {
      const animationTimer = setInterval(animateAStar, 500); // Adjust the delay (in milliseconds) as needed
      return () => clearInterval(animationTimer);
    }
  }, [isRunning, openList, closedList, path]);

  function runOneStep() {
    if (!openList.length || isRunning) return;
    animateAStar();
  }

  function toggleAnimation() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  const items = aGrid.map((row, i) =>
    row.map((col, j) => {
      const cell = aGrid[i][j];
      const isStart = cell === aStart;
      const isEnd = cell === aEnd;
      const isInClosedList = closedList.includes(cell);
      const isInOpenList = openList.includes(cell);
      const isPath = path.includes(cell);

      return (
        <Grid
          item
          key={j}
          data-row={i}
          data-col={j}
          style={{
            width: "20px",
            height: "20px",
            border: "1px solid black",
            backgroundColor: isPath
              ? "blue"
              : isInOpenList
              ? "green"
              : isInClosedList
              ? "red"
              : "white",
          }}
        />
      );
    })
  );
  //isStart? "green": isEnd? "red":
  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleAnimation}>
        {isRunning ? "Stop Animation" : "Start Animation"}
      </Button>
      <Button variant="contained" color="primary" onClick={runOneStep}>
        Run One Step
      </Button>

      <Grid
        container
        spacing={13}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {items.map((row, i) => (
          <Grid
            container
            spacing={13}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {row}
          </Grid>
        ))}
      </Grid>
    </div>
  );

  function get_neighbors(pos) {
    let length = aGrid.length;
    let width = aGrid[0].length;
    let neighbors = [];
    if (pos % width !== width - 1) {
      let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(aGrid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos % width !== 0) {
      let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];

      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(aGrid[gridPos[0]][gridPos[1]]);
      }
    }

    if (pos >= width) {
      let gridPos = [(pos - width) % width, Math.floor((pos - width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(aGrid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos < length * width - width) {
      let gridPos = [(pos + width) % width, Math.floor((pos + width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(aGrid[gridPos[0]][gridPos[1]]);
      }
    }
    return neighbors;
  }
}

export default AStar;

function a_star(start, end, grid) {
  let length = grid.length;
  let width = grid[0].length;
  // Initialize an empty open list and an empty closed list
  let openList = [];
  let closedList = [];

  start.j = 0;
  start.f = 0;

  // Add start point to open list
  openList.push(start);
  // While open list is not empty
  while (openList.length > 0) {
    // Find the point with lowest f value on open list, call it current
    let current = openList.reduce((min, point) =>
      point.f < min.f ? point : min
    );

    // Pop current off open list
    openList.splice(openList.indexOf(current), 1);

    // Generate current's successors and set their parents to current
    let successors = get_neighbors(current.row * width + current.col);
    for (let successor of successors) {
      successor.parent = current;
      // If successor is the end, stop search and return the path
      if (successor.row === end.row && successor.col === end.col) {
        // Initialize an empty array for the path
        let path = [];
        // Trace back the path from end to start using the parent pointers
        while (successor !== undefined) {
          // Add successor to the front of the path
          path.unshift(successor);
          // Move to the parent of successor
          successor = successor.parent;
        }
        // Return the path
        return path;
      }
      // Else, compute j, h and f for successor
      successor.j = current.j + 1; // Assuming unit cost for each action
      successor.h = manhattanDistance(successor, end);
      successor.f = successor.j + successor.h;
      successor.parent = current;

      // If a point with the same position as successor is in the open list with a lower f, skip this successor
      if (
        openList.some(
          (point) =>
            point.row === successor.row &&
            point.col === successor.col &&
            point.f < successor.f
        )
      ) {
        continue;
      }
      // If a point with the same position as successor is in the closed list with a lower f, skip this successor
      if (
        closedList.some(
          (point) =>
            point.row === successor.row &&
            point.col === successor.col &&
            point.f < successor.f
        )
      ) {
        continue;
      }

      // Otherwise, add the point to the open list
      openList.push(successor);
    }

    // Push current on the closed list
    closedList.push(current);
  }

  // If open list is empty, return null (no path found)
  return null;

  function get_neighbors(pos) {
    let neighbors = [];
    if (pos % width !== width - 1) {
      let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos % width !== 0) {
      let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];

      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }

    if (pos >= width) {
      let gridPos = [(pos - width) % width, Math.floor((pos - width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos < length * width - width) {
      let gridPos = [(pos + width) % width, Math.floor((pos + width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    return neighbors;
  }
}

function manhattanDistance(point1, point2) {
  let dx = Math.abs(point1.row - point2.row);
  let dy = Math.abs(point1.col - point2.col);

  return dx + dy;
}

/*function A_Star(start, end, grid) {
  let length = grid.length;
  let width = grid[0].length;
  // Initialize an empty open list and an empty closed list
  let openList = [];
  let closedList = [];

  start.j = 0;
  start.f = 0;

  // Add start point to open list
  openList.push(start);
  // While open list is not empty
  while (openList.length > 0) {
    // Find the point with lowest f value on open list, call it current
    let current = openList.reduce((min, point) =>
      point.f < min.f ? point : min
    );

    // Pop current off open list
    openList.splice(openList.indexOf(current), 1);

    // Generate current's successors and set their parents to current
    let successors = get_neighbors(current.row * width + current.col);
    for (let successor of successors) {
      successor.parent = current;
      // If successor is the end, stop search and return the path
      if (successor.row === end.row && successor.col === end.col) {
        // Initialize an empty array for the path
        let path = [];
        // Trace back the path from end to start using the parent pointers
        while (successor !== undefined) {
          // Add successor to the front of the path
          path.unshift(successor);
          // Move to the parent of successor
          successor = successor.parent;
        }
        // Return the path
        return path;
      }
      // Else, compute j, h and f for successor
      successor.j = current.j + 1; // Assuming unit cost for each action
      successor.h = manhattanDistance(successor, end);
      successor.f = successor.j + successor.h;
      successor.parent = current;

      // If a point with the same position as successor is in the open list with a lower f, skip this successor
      if (
        openList.some(
          (point) =>
            point.row === successor.row &&
            point.col === successor.col &&
            point.f < successor.f
        )
      ) {
        continue;
      }
      // If a point with the same position as successor is in the closed list with a lower f, skip this successor
      if (
        closedList.some(
          (point) =>
            point.row === successor.row &&
            point.col === successor.col &&
            point.f < successor.f
        )
      ) {
        continue;
      }

      // Otherwise, add the point to the open list
      openList.push(successor);
    }

    // Push current on the closed list
    closedList.push(current);
  }

  // If open list is empty, return null (no path found)
  return null;

  function get_neighbors(pos) {
    let neighbors = [];
    if (pos % width !== width - 1) {
      let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos % width !== 0) {
      let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];

      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }

    if (pos >= width) {
      let gridPos = [(pos - width) % width, Math.floor((pos - width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    if (pos < length * width - width) {
      let gridPos = [(pos + width) % width, Math.floor((pos + width) / width)];
      if (
        !closedList.some(
          (point) => point.row === gridPos[0] && point.col === gridPos[1]
        )
      ) {
        neighbors.push(grid[gridPos[0]][gridPos[1]]);
      }
    }
    return neighbors;
  }
}

function manhattanDistance(point1, point2) {
  let dx = Math.abs(point1.row - point2.row);
  let dy = Math.abs(point1.col - point2.col);

  return dx + dy;
}
export default A_Star;
*/
