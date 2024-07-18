import { expect, test } from "vitest";
// import BoardManager from "../controller/board/boardManager";
import { BfsController } from "../controller/pathfindingCellStates/algoControllers/bfsController";
import { BoardManager } from "../controller/board/boardManager";
import { ManualCellState } from "../controller/pathfindingCellStates/manual/manualCellState";
import { manhattanDistance } from "../model/subject/board/huristics/manhattanDistance";

const boardManager = new BoardManager(new ManualCellState());

test("Switching controller", () => {
  boardManager.setAlgorithmController(new BfsController());
  expect(boardManager.getAlgorithmController().constructor.name).toBe(
    "BfsController"
  );
  // boardManager.setAlgorithmController(new DfsController());
  // expect(boardManager.getAlgorithmController().constructor.name).toBe(
  //   "DfsController"
  // );
  console.log("Switching controller test passed!");
});

test("Switching huristic", () => {
  boardManager.setHuristicModel(new manhattanDistance());
  // expect(boardManager.getAlgorithmController().constructor.name).toBe(
  //   "BfsController"
  // );
  console.log("Switching huristic test passed!");
});
