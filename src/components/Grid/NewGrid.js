import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { cell as gridCell } from "./Walls";
import classes from "./Grid.module.css";
import { toggleWall } from "../../pages/NewPathFindAlgo";
export var MazeGrid = [];
export function setWallsFunction(manualWalls, setWallsState) {}
function TheGrid(props) {
  const theRow = props.row;
  const theCol = props.col;
  const walls = (props.walls || []).map(Number);
  const visitedState = (props.visited || []).map(Number);
  const pathState = props.path || [];
  const start = (props.start || [0, 0]).map(Number);
  const end = (props.end || [5, 5]).map(Number);
  const openList = props.openList || [];
  const closedList = props.closedList || [];
  const [wallsState, setWallsState] = useState([]);
  const current = props.current;
  useEffect(() => {
    // Update wallsState to match walls prop
    setWallsState(walls);
  }, [props.isRandom, props.isClear]); //
  const item = new Array(theRow).fill().map((row, i) =>
    new Array(theCol).fill().map((col, j) => {
      const cellIndex = i * theCol + j;
      const isCurrent = current === cellIndex;
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
        : isCurrent
        ? classes.current
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
}

export default TheGrid;
