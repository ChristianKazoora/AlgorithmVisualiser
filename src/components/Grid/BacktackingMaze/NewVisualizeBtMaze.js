// TheGrid.js
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
// Import the cellColors.css file
import classes from "./VisualizeBtMaze.module.css";

function TheGrid(props) {
  const walls = props.walls;
  let visited = props.visited;
  let current = props.current;
  let path = props.path;
  let openList = props.openList;
  let closedList = props.closedList;
  let start = props.start;
  let end = props.end;
  // console.log(current);

  const items = Array.from({ length: props.row }, (row, i) =>
    Array.from({ length: props.col }, (col, j) => {
      const cellIndex = i * props.col + j;
      const isCurrent = current === cellIndex;
      const isVisited = visited.includes(cellIndex) ? true : false;
      const isOpenList = openList.includes(cellIndex) ? true : false;
      const isClosedList = closedList.includes(cellIndex) ? true : false;
      const isPath = path.includes(cellIndex);
      const isStart = start[0] === i && start[1] === j;
      const isEnd = end[0] === i && end[1] === j;
      // Define a variable for the class name
      // console.log(isCurrent);
      let className = classes.grey;

      if (isVisited) className = classes.blueVisited;
      if (isCurrent) className = classes.current;
      if (isOpenList) className = classes.openList;
      if (isClosedList) className = classes.closedList;
      if (isPath) className = classes.yellowPath;
      if (isStart) className = classes.greenStart;
      if (isEnd) className = classes.redEnd;
      return (
        <Grid
          item
          xs={0}
          key={j}
          data-row={i}
          data-col={j}
          style={{
            width: "20px",
            height: "20px",
            borderTop: walls[cellIndex][0] ? "1px solid black" : "none",
            borderRight: walls[cellIndex][1] ? "1px solid black" : "none",
            borderBottom: walls[cellIndex][2] ? "1px solid black" : "none",
            borderLeft: walls[cellIndex][3] ? "1px solid black" : "none",
          }}
          // Use the className attribute instead of the backgroundColor property
          className={className}
        />
      );
    })
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Grid>
        {items.map((row, i) => (
          <Grid container item key={i}>
            {row}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TheGrid;
