import { useMaze } from "../Grid/BacktackingMaze/BtMaze";

//var BtMazeWalls;
export const cell = new Object();
cell.h = 0;
cell.f = 0;
cell.j = 0;
cell.parent = "";
cell.row = 0;
cell.col = 0;
export const Grid = (theRow, theCol) =>
  Array.from({ length: theRow }, (row, i) =>
    Array.from({ length: theCol }, (col, j) => {
      // Create a new object that inherits from gridCell
      let newCell = Object.create(cell);
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
function useWalls(row, col) {
  const { walls, currentPositions } = useMaze(Grid(row, col));
  // Use useState to manage the BtMazeWalls state

  return walls;
}

export default useWalls;
