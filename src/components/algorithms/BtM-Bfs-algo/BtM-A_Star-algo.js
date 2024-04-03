import { MazeGrid } from "../../Grid/BacktackingMaze/BtMaze";
import { Grid } from "../../Grid/Walls";
function AStar(start, end, BtMazeWalls, isRandom, row, col) {
  function resetMaze() {
    let currentGrid;
    if (isRandom) {
      currentGrid = Grid(row, col);
    } else {
      // currentGrid = MazeGrid;
    }
    for (let i = 0; i < currentGrid.length; i++) {
      for (let j = 0; j < currentGrid[i].length; j++) {
        currentGrid[i][j].h = Infinity;
        currentGrid[i][j].f = Infinity;
        currentGrid[i][j].g = Infinity;
        currentGrid[i][j].parent = undefined;
      }
    }
    return currentGrid;
  }
  let walls = BtMazeWalls;
  let maze = resetMaze();

  let aStart = maze[start[0]][start[1]];
  aStart.g = 0;
  aStart.h = 0;
  aStart.f = 0;

  let aEnd = maze[end[0]][end[1]];
  const openList = [aStart];
  const closedList = [];
  const path = [];
  let allCellsOpenList = [];
  allCellsOpenList.push(aStart.row * maze[0].length + aStart.col);

  while (openList.length > 0) {
    let current = openList.reduce((min, point) =>
      point.f < min.f ? point : min
    );

    if (current === aEnd) {
      // Path found
      let temp = current;
      let newPath = [temp.row * maze[0].length + temp.col];
      while (temp.parent) {
        temp = temp.parent;
        newPath.unshift(temp.row * maze[0].length + temp.col);
      }
      path.push(...newPath);
      return { path, closedList, allCellsOpenList };
    }
    openList.splice(openList.indexOf(current), 1);

    let successors = get_neighbors(current.row * maze[0].length + current.col);
    for (let successor of successors) {
      if (
        !closedList.includes(successor.row * maze[0].length + successor.col)
      ) {
        let tempG = current.g + 1;
        if (tempG < successor.g) {
          successor.g = tempG;
          successor.h = manhattanDistance(successor, aEnd);
          successor.f = successor.g + successor.h;
          successor.parent = current;
          maze[successor.row][successor.col] = successor;
          if (!openList.includes(successor)) {
            openList.push(successor);
            allCellsOpenList.push(
              successor.row * maze[0].length + successor.col
            );
          }
        }
      }
    }
    closedList.push(current.row * maze[0].length + current.col);
  }
  function get_neighbors(pos) {
    let length = maze.length;
    let width = maze[0].length;
    let neighbors = [];

    if (walls[pos][1] === false) {
      if (pos % width !== width - 1) {
        let gridPos = [(pos + 1) % width, Math.floor((pos + 1) / width)];
        if (!closedList.includes(maze[gridPos[1]][gridPos[0]])) {
          neighbors.push(maze[gridPos[1]][gridPos[0]]);
        }
      }
    }

    if (walls[pos][3] === false) {
      if (pos % width !== 0) {
        let gridPos = [(pos - 1) % width, Math.floor((pos - 1) / width)];

        if (!closedList.includes(maze[gridPos[1]][gridPos[0]])) {
          neighbors.push(maze[gridPos[1]][gridPos[0]]);
        }
      }
    }

    if (walls[pos][0] === false) {
      if (pos >= width) {
        let gridPos = [
          (pos - width) % width,
          Math.floor((pos - width) / width),
        ];
        if (!closedList.includes(maze[gridPos[1]][gridPos[0]])) {
          neighbors.push(maze[gridPos[1]][gridPos[0]]);
        }
      }
    }
    if (walls[pos][2] === false) {
      if (pos < length * width - width) {
        let gridPos = [
          (pos + width) % width,
          Math.floor((pos + width) / width),
        ];
        if (!closedList.includes(maze[gridPos[1]][gridPos[0]])) {
          neighbors.push(maze[gridPos[1]][gridPos[0]]);
        }
      }
    }
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
