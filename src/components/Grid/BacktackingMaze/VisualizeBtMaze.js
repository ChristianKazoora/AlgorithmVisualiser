// TheGrid.js
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
// Import the cellColors.css file
import classes from "./VisualizeBtMaze.module.css";

function TheGrid(props) {
  const walls = props.walls;

  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [openList, setOpenList] = useState([]);
  const [closedList, setClosedList] = useState([]);
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);

  useEffect(
    () => {
      animateClosedList(props.closedList);
      animatePath(props.path);
      animateVisited(props.visited);
      animateOpenList(props.openList);
    },
    [props.visited, props.path],
    props.closedList,
    props.openList
  );

  const animatePath = (path) => {
    setPath([]);
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        setPath((prevPath) => [...prevPath, path[i]]);
      }, 0); // Delay the color change by 500ms per step
    }
  };

  const animateVisited = (visited) => {
    setVisited([]);
    for (let i = 0; i < visited.length; i++) {
      setTimeout(() => {
        setVisited((prevVisited) => [...prevVisited, visited[i]]);
      }, 0); // Delay the color change by 10ms per visited cell
    }
  };

  const animateClosedList = (closedList) => {
    setClosedList([]);
    if (closedList !== undefined)
      for (let i = 0; i < closedList.length; i++) {
        setTimeout(() => {
          setClosedList((prevClosedList) => [...prevClosedList, closedList[i]]);
        }, 0); // Delay the color change by 10ms per closedList cell
      }
  };
  const animateOpenList = (openList) => {
    setOpenList([]);
    for (let i = 0; i < openList.length; i++) {
      setTimeout(() => {
        setOpenList((prevOpenList) => [...prevOpenList, openList[i]]);
      }, 0); // Delay the color change by 10ms per visited cell
    }
  };

  const items = Array.from({ length: props.row }, (row, i) =>
    Array.from({ length: props.col }, (col, j) => {
      const cellIndex = i * props.col + j;
      const isVisited = visited.includes(cellIndex);
      const isOpenList = openList.includes(cellIndex);
      const isClosedList = closedList.includes(cellIndex);
      //console.log("openList= " + openList);
      const isPath = path.includes(cellIndex);
      const isStart = start[0] === i && start[1] === j;
      const isEnd = end[0] === i && end[1] === j;
      // Define a variable for the class name
      let className = classes.grey;
      if (isVisited) className = classes.blueVisited;

      if (isOpenList) className = classes.openList;
      if (isClosedList) className = classes.closedList;
      // if (isCurrent) className = classes.current;

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
