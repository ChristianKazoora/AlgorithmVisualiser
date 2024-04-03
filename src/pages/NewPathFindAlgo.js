import useWalls from "../components/Grid/Walls";
import { CompleteMazeWalls } from "../components/Grid/BacktackingMaze/BtMaze";
import BtMaze from "../components/Grid/BacktackingMaze/BtMaze";
import VisualiseBT from "../components/Grid/BacktackingMaze/NewVisualizeBtMaze";
import React, { useState, useEffect } from "react";
import ManualGrid from "../components/Grid/NewGrid";
import BtBfs from "../components/algorithms/NewBtM-Bfs-algo/BtM-Bfs-algo";
import BtDfs from "../components/algorithms/NewBtM-Bfs-algo/Btm-Dfs-algo";
import ManualBFS from "../components/algorithms/NewPathFinding/Bfs-algo";
import ManualDFS from "../components/algorithms/NewPathFinding/Dfs-algo";
import ManualAStar from "../components/algorithms/NewPathFinding/A*-algo";
import BtA_Star from "../components/algorithms/NewBtM-Bfs-algo/BtM-A_Star-algo";
import { cell as gridCell } from "../components/Grid/Walls";
function PathFinder(props) {
  const start = props.startPoint;
  const end = props.endPoint;
  var currentAlgoState = props.algo;
  var currentState = "Manual";
  var isStart = props.start;
  var random = props.random;
  var BtMazeWalls = [];
  var col = props.col;
  var row = props.row;
  var isRandom;
  if (props.state) {
    currentState = "Auto";
  } else {
    currentState = "Manual";
  }
  const RandomBtMazeWalls = useWalls(row, col);
  if (CompleteMazeWalls() !== undefined) {
    BtMazeWalls = CompleteMazeWalls();
    isRandom = false;
  } else {
    BtMazeWalls = RandomBtMazeWalls;
    isRandom = true;
  }
  const [generator, setGenerator] = useState(null); // create a state for the generator object
  let [path, setPath] = useState([]); // create a state for the generator object
  let [openList, setOpenList] = useState([]); // create a state for the generator object
  let [closedList, setClosedList] = useState([]); // create a state for the generator object
  let [visited, setVisited] = useState([]); // create a state for the generator object
  let [current, setCurrent] = useState(start); // create a state for the generator object

  useEffect(() => {
    if (isStart) {
      if (currentState === "Auto") {
        switch (currentAlgoState) {
          // switch statement to render the component based on the option
          case "Select":
            return;
          case "BFS":
            setGenerator(BtBfs(start, end, BtMazeWalls, row, col));
            break;
          case "DFS":
            setGenerator(BtDfs(start, end, BtMazeWalls, row, col));
            break;
          case "A*":
            setGenerator(BtA_Star(start, end, BtMazeWalls, isRandom, row, col));
            break;
          default:
            path = [];
            visited = [];
            return;
        }
      } else {
        //render for manual
        switch (currentAlgoState) {
          // switch statement to render the component based on the option
          case "Select":
            return;
          case "BFS":
            setGenerator(ManualBFS(start, end, ManualWalls, row, col));
            break;
          case "DFS":
            setGenerator(ManualDFS(start, end, ManualWalls, row, col));
            break;
          case "A*":
            let aStarGrid = Array.from({ length: row }, (row, i) =>
              Array.from({ length: col }, (col, j) => {
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
            setGenerator(ManualAStar(start, end, ManualWalls, aStarGrid));
            break;
          default:
            path = [];
            visited = [];
            return;
        }
      }
    } else return;
  }, [isStart]);
  useEffect(() => {
    // if (generator !== null) {

    // }
    if (generator) {
      setPath([]);
      setVisited([]);
      setCurrent(start);
      setClosedList([]);
      setOpenList([]);
      const handle = setInterval(() => {
        // create an interval to call next() on the generator object every certain time
        const { value, done } = generator.next(); // get the value and done properties from the returned object by next()
        //  console.log("value.items: " + value.items);
        if (done) {
          clearInterval(handle); // clear the interval when done is true
          setGenerator(null); // reset the generator state to null
        } else {
          // Use state update functions here
          if (value.path !== undefined) {
            setPath(value.path); //((prevPath) => [...prevPath, ...value.path]);
          }
          if (value.current !== undefined) {
            setCurrent(value.current);
          }

          if (value.visited !== undefined) {
            setVisited((prevVisited) => [...prevVisited, ...value.visited]);
          }
          if (value.openList !== undefined) {
            setOpenList((prevOpenList) => [...prevOpenList, ...value.openList]);
          }
          if (value.closedList !== undefined) {
            setClosedList((prevClosedList) => [
              ...prevClosedList,
              ...value.closedList,
            ]);
          }
        }
      }); // adjust this time as you wish
      return () => clearInterval(handle); // clear the interval when unmounting or re-rendering
    }
  }, [generator]); // run this effect only when generator changes
  // console.log("items: " + items);

  useEffect(() => {
    setPath([]);
    setVisited([]);
    setCurrent(start);
    setClosedList([]);
    setOpenList([]);
    ManualWalls = [];
  }, [props.isCleard]);
  //sconsole.log(props.isCleard);

  if (random) {
    if (currentState === "Auto") {
      //render create bt maze
      return <BtMaze col={col} row={row} />;
    } else {
      while (ManualWalls.length < 800) {
        // generate a random integer between min and max
        let random = Math.floor(Math.random() * (row * col - 0));
        // push it into the array
        ManualWalls.push(random);
      }
      ManualWalls = ManualWalls.filter((cellIndex) => {
        // Return true if the cell index is not equal to the start or end cell index
        return cellIndex !== start && cellIndex !== end; //  setWallsState(ManualWalls);
      });
    }
  } else {
    ManualWalls = [];
  }

  //check if Auto then render grid
  if (currentState === "Auto") {
    return (
      <VisualiseBT
        start={start}
        end={end}
        walls={BtMazeWalls}
        path={path}
        visited={visited}
        current={current}
        closedList={closedList}
        openList={openList}
        col={col}
        row={row}
      />
    );
  } else {
    return (
      <ManualGrid
        start={start}
        end={end}
        walls={ManualWalls}
        isRandom={random}
        isCleard={props.isCleard}
        path={path}
        visited={visited}
        current={current}
        openList={openList}
        closedList={closedList}
        row={row}
        col={col}
      />
    );
  }
}
export default PathFinder;
var ManualWalls = [];
export const toggleWall = (i, j, wallsState, setWallsState, theCol) => {
  const index = i * theCol + j;
  const isWall = wallsState.includes(index);
  // console.log(ManualWalls);

  setWallsState((prevWalls) => {
    if (isWall) {
      ManualWalls = prevWalls.filter((wall) => wall !== index);
      return ManualWalls;
    } else {
      ManualWalls = [...prevWalls, index];
      return ManualWalls;
    }
  });
};
