import React, { useState, useEffect } from "react";
import { cell as gridCell } from "../Walls";
import { Grid } from "@mui/material";
import classes from "../Grid.module.css";
import Visualize from "./VisualizeBtMaze";
var visited = [];
var next = [];
let currentPositions = [];
var stack = [];
var cellWalls;
export var MazeGrid = [];
function index(i, width, j) {
  return i * width + j;
}

function getNeighbors(current, grid) {
  var temp = [Math.floor(current / grid[0].length), current % grid[0].length];
  const [rowIndex, colIndex] = temp;
  const height = grid.length;
  const width = grid[0].length;
  const top = [rowIndex - 1, colIndex];
  const bottom = [rowIndex + 1, colIndex];
  const left = [rowIndex, colIndex - 1];
  const right = [rowIndex, colIndex + 1];
  let neighbors = [];
  if (top[0] >= 0 && !visited.includes(index(top[0], width, top[1]))) {
    neighbors.push(index(top[0], width, top[1]));
  }
  if (
    bottom[0] < height &&
    !visited.includes(index(bottom[0], width, bottom[1]))
  ) {
    neighbors.push(index(bottom[0], width, bottom[1]));
  }
  if (left[1] >= 0 && !visited.includes(index(left[0], width, left[1]))) {
    neighbors.push(index(left[0], width, left[1]));
  }
  if (right[1] < width && !visited.includes(index(right[0], width, right[1]))) {
    neighbors.push(index(right[0], width, right[1]));
  }
  return neighbors;
}

export const useMaze = (grid) => {
  // Use useState to create a state variable for the current cell and initialize it with zero
  const [current, setCurrent] = useState(0);

  // Use useState to create a state variable for the walls of each cell and initialize it with an array of true values
  const [walls, setWalls] = useState(
    Array.from({ length: grid.length * grid[0].length }, () => [
      true,
      true,
      true,
      true,
    ])
  );

  function generateMaze(current) {
    if (current === null) {
      return;
    }
    // Push the current cell to the visited array if it is not already there
    if (!visited.includes(current)) {
      visited.push(current);
    }

    // Find the neighbours of the current cell
    next = [...getNeighbors(current, grid)];

    if (next.length > 0) {
      var randomIndex = Math.floor(Math.random() * next.length);
      var nextCell = next[randomIndex];
      stack.push(current);

      // Remove the wall between the current cell and the next cell
      var direction = nextCell - current;
      var newWalls = walls;

      if (direction === -grid[0].length) {
        // Top neighbor
        currentPositions.push(current); //.add(current);
        newWalls[current][0] = false; // Remove top wall of current cell
        newWalls[nextCell][2] = false; // Remove bottom wall of next cell
      } else if (direction === grid[0].length) {
        // Bottom neighbor
        currentPositions.push(current); //.add(current);
        newWalls[current][2] = false; // Remove bottom wall of current cell
        newWalls[nextCell][0] = false; // Remove top wall of next cell
      } else if (direction === -1) {
        // Left neighbor
        currentPositions.push(current); //.add(current);
        newWalls[current][3] = false; // Remove left wall of current cell
        newWalls[nextCell][1] = false; // Remove right wall of next cell
      } else if (direction === 1) {
        // Right neighbor
        currentPositions.push(current); //.add(current);
        newWalls[current][1] = false; // Remove right wall of current cell
        newWalls[nextCell][3] = false; // Remove left wall of next cell
      }

      // Update the walls state with the new array
      setWalls(newWalls);

      // Call the function with the next cell as the argument
      generateMaze(nextCell);
    } else if (stack.length > 0) {
      //backtracking
      generateMaze(stack.pop());
    } else {
      // Maze generation complete, set the current state to null and return the walls data
      setCurrent(null);
      return { walls, currentPositions };
    }
  }

  // Call the function with the initial current state as an argument
  generateMaze(current);

  // Return the walls state as an output of the hook
  return { walls, currentPositions };
};

// Define a custom component for drawing the sides
function Boarders(props) {
  // Destructure the items prop
  const { grid, walls, currentPositions } = props;
  cellWalls = walls;

  // Define a state variable for tempWalls
  const [tempWalls, setTempWalls] = useState(
    // Initialize tempWalls with an array of arrays of true values
    Array.from({ length: grid.length * grid[0].length }, () => [
      true,
      true,
      true,
      true,
    ])
  );
  const start = [14, 23];
  const end = [14, 53];
  // Define a state variable for count
  const [count, setCount] = useState(0);

  // Define an effect for updating tempWalls and count
  useEffect(() => {
    // Define a timer that runs every second
    const timer = setInterval(() => {
      // Get the current position from the currentPositions array
      var currentPosition = currentPositions[count];
      // Get the corresponding wall from the walls array
      var wall = walls[currentPosition];
      //console.log("pos (" + currentPosition + ") walls {" + wall + "}");
      // Update tempWalls by setting the wall at the current position to false
      setTempWalls((prevTempWalls) => {
        // Copy the previous tempWalls array
        var newTempWalls = [...prevTempWalls];
        // Set the wall at the current position to false
        newTempWalls[currentPosition] = wall.map((side) => !side);
        // Return the new tempWalls array
        return newTempWalls;
      });
      if (count === walls.length + walls.length - 2) {
        return;
      }
      // Update count by incrementing it by one
      setCount((prevCount) => prevCount + 1);
    }, 0);

    //Return a cleanup function that clears the timer
    return () => {
      clearInterval(timer);
    };
  }, [count]); // Pass walls and currentPositions as dependencies

  function nextPos(curr, next, currDirection, pos) {
    var direction = next - curr;

    //top
    if (direction === -grid[0].length && currDirection === "Top") {
      console.log("Top, pos =" + pos + "curr= " + curr);
      return true;
      //bottom
    } else if (direction === grid[0].length && currDirection === "Right") {
      console.log("Right, pos =" + pos + "curr= " + curr);
      return true;
      //left
    } else if (direction === -1 && currDirection === "Bottom") {
      console.log("Bottom, pos =" + pos + "curr= " + curr);
      return true;
      //right
    } else if (direction === 1 && currDirection === "Left") {
      console.log("Left, pos =" + pos + "curr= " + curr);
      return true;
    }
    if (curr !== pos) {
      console.log("Out, pos =" + pos + "curr= " + curr);
      return true;
    }
  }
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {grid.map((row, i) => (
        // Use a Grid item element for each row with some styles and map over each column
        <Grid
          item
          container
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {row.map((col, j) => {
            const cellIndex = i * row.length + j;
            const isCurrent = cellIndex === currentPositions[count];
            const backgroundColor = isCurrent ? "green" : "white";

            return (
              // Use a Grid item element for each column and pass some styles
              <Grid
                item
                key={j}
                container
                style={{
                  // Use a fixed width and height for each item
                  width: "20px",
                  height: "20px",
                  // Use a border to create a contrast between the items

                  borderTop:
                    tempWalls[cellIndex][0] === false &&
                    nextPos(
                      currentPositions[cellIndex],
                      currentPositions[cellIndex + 1],
                      "Top",
                      cellIndex
                    )
                      ? "1px solid black"
                      : "none",
                  borderRight:
                    tempWalls[cellIndex][1] === false &&
                    nextPos(
                      currentPositions[cellIndex],
                      currentPositions[cellIndex + 1],
                      "Right",
                      cellIndex
                    )
                      ? "1px solid black"
                      : "none",
                  borderBottom:
                    tempWalls[cellIndex][2] === false &&
                    nextPos(
                      currentPositions[cellIndex],
                      currentPositions[cellIndex + 1],
                      "Bottom",
                      cellIndex
                    )
                      ? "1px solid black"
                      : "none",
                  borderLeft:
                    tempWalls[cellIndex][3] === false &&
                    nextPos(
                      currentPositions[cellIndex],
                      currentPositions[cellIndex + 1],
                      "Left",
                      cellIndex
                    )
                      ? "1px solid black"
                      : "none",
                  // Set the background color based on the conditions
                  backgroundColor,
                }}
              ></Grid>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
}

function Boarderss(props) {
  const { grid, walls, currentPositions } = props;

  // Define a state variable for tempWalls
  const [tempWalls, setTempWalls] = useState(
    // Initialize tempWalls with an array of arrays of true values
    Array.from({ length: grid.length * grid[0].length }, () => [
      true,
      true,
      true,
      true,
    ])
  );

  // Define a state variable for count
  const [count, setCount] = useState(0);

  function nextPos(curr, next, currDirection, pos) {
    var direction = next - curr;

    if (curr !== pos) {
      console.log("Out, pos =" + pos + "curr= " + curr);
      return true;
    } else if (direction === -grid[0].length && currDirection === "Top") {
      console.log("Top, pos =" + pos + "curr= " + curr);
      return true;
    } else if (direction === grid[0].length && currDirection === "Right") {
      console.log("Right, pos =" + pos + "curr= " + curr);
      return true;
    } else if (direction === -1 && currDirection === "Bottom") {
      console.log("Bottom, pos =" + pos + "curr= " + curr);
      return true;
    } else if (direction === 1 && currDirection === "Left") {
      console.log("Left, pos =" + pos + "curr= " + curr);
      return true;
    }
  }

  // Define an effect for updating tempWalls and count
  useEffect(() => {
    // Define a timer that runs every second
    const timer = setInterval(() => {
      // Get the current position from the currentPositions array
      var currentPosition = currentPositions[count];
      // Get the corresponding wall from the walls array
      var wall = walls[currentPosition];
      // Update tempWalls by setting the wall at the current position to false
      setTempWalls((prevTempWalls) => {
        // Copy the previous tempWalls array
        var newTempWalls = [...prevTempWalls];
        // Set the wall at the current position to false
        newTempWalls[currentPosition] = wall.map((side) => !side);
        // Return the new tempWalls array
        return newTempWalls;
      });
      if (count === walls.length + walls.length - 2) {
        clearInterval(timer);
      } else {
        // Update count by incrementing it by one
        setCount((prevCount) => prevCount + 1);
      }
    });

    // Return a cleanup function that clears the timer
    return () => {
      clearInterval(timer);
    };
  }, [count, currentPositions, walls, grid]);

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {grid.map((row, i) => (
        <Grid
          item
          container
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {row.map((col, j) => {
            const cellIndex = i * row.length + j;
            const isCurrent = cellIndex === currentPositions[count];
            const backgroundColor = isCurrent ? "green" : "white";

            // Get the wall directions for the current cell
            const [top, right, bottom, left] = tempWalls[cellIndex];

            return (
              <Grid
                item
                key={j}
                container
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor,
                  borderTop: top ? "1px solid black" : "none",
                  borderRight: right ? "1px solid black" : "none",
                  borderBottom: bottom ? "1px solid black" : "none",
                  borderLeft: left ? "1px solid black" : "none",
                }}
              ></Grid>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
}

// Define a custom component for the grid
function BtMaze(props) {
  // Create a 34x68 array of items   24x48
  const grid = Array.from({ length: props.row }, (row, i) =>
    Array.from({ length: props.col }, (col, j) => {
      // Create a new object that inherits from gridCell
      let newCell = Object.create(gridCell);
      // Assign the row and col properties to the new cell
      newCell.row = i;
      newCell.col = j;
      newCell.h = Infinity;
      newCell.f = Infinity;
      newCell.g = Infinity;
      newCell.parent = undefined;
      // Return the new cell
      return newCell;
    })
  );
  MazeGrid = grid;
  visited = [];
  next = [];
  stack = [];

  // Call the useMaze hook with the grid prop and get the walls output
  const { walls, currentPositions } = useMaze(grid);

  return (
    <div>
      <Grid>
        <Boarders
          grid={grid}
          walls={walls}
          currentPositions={currentPositions}
        />
      </Grid>
    </div>
  );
}

export default BtMaze;
// Function to be called when the maze generation is complete
export const CompleteMazeWalls = () => {
  return cellWalls;
};
/*

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
var visited = [];
var next = [];
var stack = [];
var cellWalls;
function index(i, width, j) {
  return i * width + j;
}

function getNeighbors(current, grid) {
  var temp = [Math.floor(current / grid[0].length), current % grid[0].length];
  const [rowIndex, colIndex] = temp;
  const height = grid.length;
  const width = grid[0].length;
  const top = [rowIndex - 1, colIndex];
  const bottom = [rowIndex + 1, colIndex];
  const left = [rowIndex, colIndex - 1];
  const right = [rowIndex, colIndex + 1];
  let neighbors = [];
  if (top[0] >= 0 && !visited.includes(index(top[0], width, top[1]))) {
    neighbors.push(index(top[0], width, top[1]));
  }
  if (
    bottom[0] < height &&
    !visited.includes(index(bottom[0], width, bottom[1]))
  ) {
    neighbors.push(index(bottom[0], width, bottom[1]));
  }
  if (left[1] >= 0 && !visited.includes(index(left[0], width, left[1]))) {
    neighbors.push(index(left[0], width, left[1]));
  }
  if (right[1] < width && !visited.includes(index(right[0], width, right[1]))) {
    neighbors.push(index(right[0], width, right[1]));
  }
  return neighbors;
}

// Define a custom component for drawing the sides
function Boarders(props) {
  // Destructure the items prop
  const { grid } = props;

  // Use useState to create a state variable for the current cell and initialize it with zero
  const [current, setCurrent] = useState(0);

  // Use useState to create a state variable for the walls of each cell and initialize it with an array of true values
  const [walls, setWalls] = useState(
    Array.from({ length: grid.length * grid[0].length }, () => [
      true,
      true,
      true,
      true,
    ])
  );

  // Use useEffect to run some code when the current state changes or when the component mounts
  useEffect(() => {
    // Push the current cell to the visited array if it is not already there
    if (!visited.includes(current)) {
      visited.push(current);
    }

    // Find the neighbours of the current cell
    next = [...getNeighbors(current, grid)];

    if (next.length > 0) {
      var randomIndex = Math.floor(Math.random() * next.length);
      var nextCell = next[randomIndex];
      stack.push(current);

      // Remove the wall between the current cell and the next cell
      var direction = nextCell - current;
      var newWalls = [...walls];

      if (direction === -grid[0].length) {
        // Top neighbor
        newWalls[current][0] = false; // Remove top wall of current cell
        newWalls[nextCell][2] = false; // Remove bottom wall of next cell
      } else if (direction === grid[0].length) {
        // Bottom neighbor
        newWalls[current][2] = false; // Remove bottom wall of current cell
        newWalls[nextCell][0] = false; // Remove top wall of next cell
      } else if (direction === -1) {
        // Left neighbor
        newWalls[current][3] = false; // Remove left wall of current cell
        newWalls[nextCell][1] = false; // Remove right wall of next cell
      } else if (direction === 1) {
        // Right neighbor
        newWalls[current][1] = false; // Remove right wall of current cell
        newWalls[nextCell][3] = false; // Remove left wall of next cell
      }

      // Update the walls state with the new array
      setWalls(newWalls);

      // Set the next cell as the current cell
      setCurrent(nextCell);
    } else if (stack.length > 0) {
      //backtracking
      setCurrent(stack.pop());
    } else {
      // Maze generation complete, call the onComplete function with the walls data
      setCurrent(null);
      cellWalls = walls;
    }
    // Add an empty dependency array to make sure this effect only runs once when the component mounts and when the current state changes
  }, [current, grid, walls]);

  // Return a Grid container element with some styles and map over the items array
  return (
    <Grid
      container
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {grid.map((row, i) => (
        // Use a Grid item element for each row with some styles and map over each column
        <Grid item key={i} style={{ display: "flex", flexDirection: "row" }}>
          {row.map((col, j) => {
            const cellIndex = i * row.length + j;
            const isCurrent = cellIndex === current;
            const isVisited = visited.includes(cellIndex);
            const isBacktracking = stack.includes(cellIndex);
            const backgroundColor = isCurrent
              ? "green"
              : isBacktracking
              ? "#9370db"
              : isVisited
              ? "#d3d3d3"
              : "white";

            return (
              // Use a Grid item element for each column and pass some styles
              <Grid
                item
                key={j}
                style={{
                  // Use a fixed width and height for each item
                  width: "20px",
                  height: "20px",

                  // Use a border to create a contrast between the items
                  borderTop: walls[cellIndex][0] ? "1px solid black" : "none",
                  borderRight: walls[cellIndex][1] ? "1px solid black" : "none",
                  borderBottom: walls[cellIndex][2]
                    ? "1px solid black"
                    : "none",
                  borderLeft: walls[cellIndex][3] ? "1px solid black" : "none",
                  // Set the background color based on the conditions
                  backgroundColor,
                }}
              ></Grid>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
}

// Define a custom component for the grid
function BtMaze(props) {
  // Create a 34x68 array of items   24x48
  const grid = Array.from({ length: 30 }, (row, i) =>
    Array.from({ length: 40 }, (col, j) => [i, j])
  );

  return (
    <div>
      <Grid>
        <Boarders grid={grid} />
      </Grid>
    </div>
  );
}

export default BtMaze;
// Function to be called when the maze generation is complete
export const CompleteMazeWalls = () => {
  return cellWalls;
};
*/
