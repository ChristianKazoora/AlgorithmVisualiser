import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { cell as gridCell } from "./Walls";
import classes from "./Grid.module.css";
import { toggleWall } from "../../pages/PathFindAlgo";
export var MazeGrid = [];
function TheGrid(props) {
  const theRow = props.row;
  const theCol = props.col;
  const walls = (props.walls || []).map(Number);
  const visited = (props.visited || []).map(Number);
  const path = props.path || [];
  const start = (props.start || [0, 0]).map(Number);
  const end = (props.end || [5, 5]).map(Number);
  const theOpenList = props.openList || [];
  const theClosedList = props.closedList || [];

  const [wallsState, setWallsState] = useState(walls);
  const [visitedState, setVisitedState] = useState(visited);
  const [pathState, setPathState] = useState(path);
  const [openList, setOpenList] = useState(theOpenList);
  const [closedList, setClosedList] = useState(theClosedList);

  // useEffect(() => {
  // Update visited state with a delay for each cell
  visited.forEach((cell, index) => {
    setTimeout(() => {
      setVisitedState((prevState) =>
        prevState.includes(cell) ? prevState : [...prevState, cell]
      );
    }, 1);
  });
  // Update closedList state with a delay for each cell
  theClosedList.forEach((cell, index) => {
    setTimeout(() => {
      setClosedList((prevState) =>
        prevState.includes(cell) ? prevState : [...prevState, cell]
      );
    }, index);
  });

  // Update openList state with a delay for each cell
  theOpenList.forEach((cell, index) => {
    setTimeout(() => {
      setOpenList((prevState) =>
        prevState.includes(cell) ? prevState : [...prevState, cell]
      );
    }, index);
  });

  // Update path state with a delay for each cell
  path.forEach((cell, index) => {
    setTimeout(() => {
      setPathState((prevState) =>
        prevState.includes(cell) ? prevState : [...prevState, cell]
      );
    }, index * 10);
  });

  useEffect(() => {
    // Check if props.start and props.end are empty arrays
    if (props.isCleard) {
      //Set pathState and visitedState to empty arrays
      setPathState([]);
      setVisitedState([]);
      setOpenList([]);
      setClosedList([]);
    }
  }, [props.isCleard]);
  const item = new Array(theRow).fill().map((row, i) =>
    new Array(theCol).fill().map((col, j) => {
      const cellIndex = i * theCol + j;
      const isWall = wallsState.includes(cellIndex);
      const isVisited = visitedState.includes(cellIndex);
      const isOpenList = openList.includes(cellIndex);
      const isClosedList = closedList.includes(cellIndex);
      const isPath = pathState.includes(cellIndex);
      const isStart = start[0] === i && start[1] === j;
      const isEnd = end[0] === i && end[1] === j;
      // Define a variable for the class name
      const style = isStart
        ? classes.start
        : isEnd
        ? classes.end
        : isWall
        ? classes.wall
        : isPath
        ? classes.path
        : isVisited
        ? classes.visited
        : isClosedList
        ? classes.closedList
        : isOpenList
        ? classes.openList
        : classes.button;
      return (
        <Grid>
          <Grid container item>
            <Grid item xs={0}>
              <button
                className={style}
                onClick={() =>
                  toggleWall(i, j, wallsState, setWallsState, theCol)
                }
              ></button>
            </Grid>
          </Grid>
        </Grid>
      );
    })
  );
  MazeGrid = item;

  return (
    <div
      className={classes.grid}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Grid>
        {item.map((row, i) => (
          <Grid container item key={i}>
            {row}
          </Grid>
        ))}
      </Grid>
    </div>
  );

  // }, []);
  /*
  // Create the grid array with cell objects
  const grid = Array.from({ length: theRow }, (row, i) =>
    Array.from({ length: theCol }, (col, j) => {
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
  return (
    <div className={classes.grid}>
      <Grid>
        {grid.map((row, i) => (
          <Grid container item key={i}>
            {row.map((cell, j) => (
              <Grid item xs={0} key={j} data-row={i} data-col={j}>
                <button
                  className={`${
                    wallsState.includes(i * theCol + j)
                      ? classes.wall + " "
                      : ""
                  }
                              ${
                                i === start[0] && j === start[1]
                                  ? classes.start + " "
                                  : ""
                              }  
                              ${
                                i === end[0] && j === end[1]
                                  ? classes.end + " "
                                  : ""
                              }
                              ${
                                pathState.includes(i * theCol + j)
                                  ? classes.path + " "
                                  : ""
                              }
                              ${
                                visitedState.includes(i * theCol + j)
                                  ? classes.visited + " "
                                  : ""
                              }
                              ${
                                openList.includes(i * theCol + j)
                                  ? classes.openList + " "
                                  : ""
                              }
                              ${
                                closedList.includes(i * theCol + j)
                                  ? classes.closedList + " "
                                  : ""
                              }
                              ${classes.button}`}
                  onClick={() =>
                    toggleWall(i, j, wallsState, setWallsState, theCol)
                  }
                ></button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
*/
}

export default TheGrid;
