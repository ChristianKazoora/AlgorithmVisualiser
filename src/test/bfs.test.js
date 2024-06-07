import { expect, test } from "vitest";
import { Board } from "../model/subject/board/board";
import { BfsModel } from "../model/subject/algorithms/pathFinding/BfsModel";
import { Pathfinding } from "../model/subject/algorithms/pathFinding/Pathfinding";
import { GetManulNeighbours } from "../model/subject/board/strategies/manual/getManulNeighbours";
import { GetManulNeigbourWD } from "../model/subject/board/strategies/manual/getManulNeigbourWD";

const size = { x: 3, y: 3 };

const board = new Board(size);
const start = { x: 0, y: 0 };
const end = { x: 2, y: 2 };
test("initializing BFS", () => {
  const strategy = new BfsModel();
  const algo = new Pathfinding(strategy, start, end, board);
});

test("BFS finds a non-diagonal path", () => {
  const strategy = new BfsModel();
  const algo = new Pathfinding(strategy, start, end, board, undefined);
  algo.setMovementModel(new GetManulNeighbours());
  algo.start();
  expect(algo.getPath().length).toBe(5);
});
test("BFS finds a diagonal path", () => {
  const strategy = new BfsModel();
  const algo = new Pathfinding(strategy, start, end, board, undefined);
  algo.setMovementModel(new GetManulNeigbourWD());
  algo.start();
  expect(algo.getPath().length).toBe(3);
});

test("BFS finds a path with walls non-diagonal", () => {
  const strategy = new BfsModel();
  const walls = [
    { x: 1, y: 0 },
    { x: 1, y: 2 },
  ];
  const algo = new Pathfinding(strategy, start, end, board, walls);
  algo.setMovementModel(new GetManulNeighbours());
  algo.start();
  expect(algo.getPath().length).toBe(5);
});

test("BFS finds a path with walls diagonal", () => {
  const strategy = new BfsModel();
  const walls = [
    { x: 1, y: 0 },
    { x: 1, y: 2 },
  ];
  const algo = new Pathfinding(strategy, start, end, board, walls);

  algo.setMovementModel(new GetManulNeigbourWD());
  algo.start();
  expect(algo.getPath().length).toBe(3);
});

test("BFS returns null if no path exists", () => {
  const strategy = new BfsModel();
  const walls = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];
  const algo = new Pathfinding(strategy, start, end, board, walls);
  algo.start();
  expect(algo.path).toBe(undefined);
});

test("each cell knows its previous cell after BFS traversal", () => {
  const strategy = new BfsModel();
  const algo = new Pathfinding(strategy, start, end, board);
  algo.start();

  expect(board.grid[0][1].previousCell).toBe(board.grid[0][0]); // The cell to the right of the start cell
  expect(board.grid[1][0].previousCell).toBe(board.grid[0][0]); // The cell below the start cell
  expect(board.grid[2][2].previousCell).not.toBe(board.grid[0][0]); // The end cell
});
