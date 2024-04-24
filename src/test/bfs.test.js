import { expect, test } from "vitest";
import { Board } from "../model/subject/board";
import { Bfs } from "../model/subject/algorithms/pathFinding/Bfs";
import { Pathfinding } from "../model/subject/algorithms/pathFinding/Pathfinding";
const size = 3;
const board = new Board(size);
const strategy = new Bfs();
const start = { x: 0, y: 0 };
const end = { x: 2, y: 2 };
test("initializing BFS", () => {
  const algo = new Pathfinding(strategy, start, end, board);
  algo.start();
});

test("BFS finds a non-diagonal path", () => {
  const algo = new Pathfinding(strategy, start, end, board);
  algo.start();
  expect(algo.getPath().length).toBe(4);
});

test("BFS returns null if no path exists", () => {
  const walls = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];
  const algo = new Pathfinding(strategy, start, end, board, walls);
  algo.start();
  expect(algo.path).toBe(undefined);
});
// test("getting neighbours", () => {
//   const board = new Board(3);
//   const current = board.board[1][1];
//   expect(board.getNeighbours(current).length).toBe(4);
//   expect(board.getNeighboursDiagonal(current).length).toBe(8);
// });

// test("each cell knows its previous cell after BFS traversal", () => {
//   const board = new Board(3);
//   const start = board.board[0][0];
//   const end = board.board[2][2];
//   const bfs = new Bfs(board, start, end);
//   bfs.start();

//   expect(board.board[0][1].previousCell).toBe(board.board[0][0]); // The cell to the right of the start cell
//   expect(board.board[1][0].previousCell).toBe(board.board[0][0]); // The cell below the start cell
//   expect(board.board[2][2].previousCell).not.toBe(board.board[0][0]); // The end cell
// });
