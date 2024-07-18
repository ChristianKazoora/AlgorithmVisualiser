import { expect, test } from "vitest";
import { Board } from "../model/subject/board/board";
import { A_StarModel } from "../model/subject/algorithms/pathFinding/aStarModel";
import { PathFindingController } from "../model/subject/algorithms/pathFinding/pathFindingController";
import { GetManulNeighbours } from "../model/subject/board/strategies/manual/getManulNeighbours";
import { GetManulNeigbourWD } from "../model/subject/board/strategies/manual/getManulNeigbourWD";
import { TurnHelper } from "../controller/pathfindingCellStates/turnHelper";

const size = { x: 3, y: 3 };

const board = new Board(size);
const start = { x: 0, y: 0 };
const end = { x: 2, y: 2 };

test("initializing A_Star", () => {
  const strategy = new A_StarModel();
  const algo = new PathFindingController(strategy, start, end, board);
});

test("A_Star finds a non-diagonal path", () => {
  const strategy = new A_StarModel();
  const algo = new PathFindingController(
    strategy,
    start,
    end,
    board,
    undefined
  );
  algo.setMovementModel(new GetManulNeighbours());
  algo.start();
  expect(algo.getPath().length).toBe(5);
});

test("Test turns", () => {
  const strategy = new A_StarModel();
  const walls = [
    { x: 1, y: 0 },
    { x: 1, y: 2 },
  ];
  const algo = new PathFindingController(strategy, start, end, board, walls);
  algo.setMovementModel(new GetManulNeighbours());
  algo.start();
  expect(TurnHelper.leftToBottomTurn(algo.getPath()[3])).toBe(true);
  expect(TurnHelper.topToRightTurn(algo.getPath()[1])).toBe(true);

  const inverseStrategy = new A_StarModel();
  const inverseAlgo = new PathFindingController(
    inverseStrategy,
    end,
    start,
    board,
    walls
  );
  inverseAlgo.setMovementModel(new GetManulNeighbours());
  inverseAlgo.start();
  expect(TurnHelper.rightToTopTurn(inverseAlgo.getPath()[3])).toBe(true);
  expect(TurnHelper.bottomToLeftTurn(inverseAlgo.getPath()[1])).toBe(true);
});
