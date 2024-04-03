import { CompleteMazeWalls } from "../components/Grid/BacktackingMaze/BtMaze";
import BtMaze from "../components/Grid/BacktackingMaze/BtMaze";
import VisualiseBT from "../components/Grid/BacktackingMaze/VisualizeBtMaze";
import ManualGrid from "../components/Grid/Grid";
import BtBfs from "../components/algorithms/BtM-Bfs-algo/BtM-Bfs-algo";
import BtDfs from "../components/algorithms/BtM-Bfs-algo/Btm-Dfs-algo";
import ManualBFS from "../components/algorithms/PathFinding/Bfs-algo";
import ManualDFS from "../components/algorithms/PathFinding/Dfs-algo";
import ManualAStar from "../components/algorithms/PathFinding/A*-algo";
//import A_Star from "../components/algorithms/PathFinding/Astart";
import BtA_Star from "../components/algorithms/BtM-Bfs-algo/BtM-A_Star-algo";
import { cell as gridCell } from "../components/Grid/Walls";
import useWalls from "../components/Grid/Walls";

function PathFinder(props) {
  var path = [];
  var visited = [];
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

  if (isStart) {
    if (currentState === "Auto") {
      switch (currentAlgoState) {
        // switch statement to render the component based on the option
        case "Select":
          return;
        case "BFS":
          var { path, visited } = BtBfs(start, end, BtMazeWalls, row, col);
          return (
            <VisualiseBT
              start={start}
              end={end}
              walls={BtMazeWalls}
              path={path}
              visited={visited}
              closedList={[]}
              openList={[]}
              col={col}
              row={row}
            />
          );
        case "DFS":
          var { path, visited } = BtDfs(start, end, BtMazeWalls, row, col);
          return (
            <VisualiseBT
              start={start}
              end={end}
              walls={BtMazeWalls}
              path={path}
              visited={visited}
              closedList={[]}
              openList={[]}
              col={col}
              row={row}
            />
          );
        case "A*":
          var { path, closedList, allCellsOpenList } = BtA_Star(
            start,
            end,
            BtMazeWalls,
            isRandom,
            row,
            col
          );
          return (
            <VisualiseBT
              start={start}
              end={end}
              walls={BtMazeWalls}
              path={path}
              closedList={closedList}
              openList={allCellsOpenList}
              visited={[]}
              col={col}
              row={row}
            />
          );
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
          var { path, visited } = ManualBFS(start, end, ManualWalls, row, col);
          return (
            <ManualGrid
              start={start}
              end={end}
              walls={ManualWalls}
              path={path}
              visited={visited}
              col={col}
              row={row}
            />
          );
        case "DFS":
          var { path, visited } = ManualDFS(start, end, ManualWalls, row, col);
          return (
            <ManualGrid
              start={start}
              end={end}
              walls={ManualWalls}
              path={path}
              openList={[]}
              closedList={[]}
              visited={visited}
              col={col}
              row={row}
            />
          );
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
          var { path, closedList, allCellsOpenList } = ManualAStar(
            start,
            end,
            ManualWalls,
            aStarGrid
          );
          return (
            <ManualGrid
              start={start}
              end={end}
              walls={ManualWalls}
              path={path}
              openList={allCellsOpenList}
              closedList={closedList}
              visited={visited}
              col={col}
              row={row}
            />
          );
        default:
          path = [];
          visited = [];
          return;
      }
    }
  } else if (random) {
    //render create bt maze
    return <BtMaze col={col} row={row} />;
  } else {
    //check if Auto then render grid
    if (currentState === "Auto") {
      return (
        <VisualiseBT
          start={start}
          end={end}
          walls={BtMazeWalls}
          path={[]}
          visited={[]}
          closedList={[]}
          openList={[]}
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
          path={[]}
          visited={[]}
          col={col}
          openList={[]}
          closedList={[]}
          row={row}
          isCleard={props.isCleard}
        />
      );
    }
  }
}

export default PathFinder;

var ManualWalls = [];
export const toggleWall = (i, j, wallsState, setWallsState, theCol) => {
  const index = i * theCol + j;
  const isWall = wallsState.includes(index);

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
