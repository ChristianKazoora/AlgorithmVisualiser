import { expect, test } from "vitest";
import BoardManager from "../controller/board/boardManager";
import { BfsController } from "../controller/pathfindingCellStates/manual/algorithmControllers/algorithms/bfsController";
import { DfsController } from "../controller/pathfindingCellStates/manual/algorithmControllers/algorithms/dfsController";

import { BoardManager } from "../controller/board/boardManager";
import { ManualCellState } from "../controller/pathfindingCellStates/manual/manualCellState";

const boardManager = new BoardManager(new ManualCellState());

test("Switching controller", () => {
  boardManager.setAlgorithmController(new BfsController());
  expect(boardManager.getAlgorithmController().constructor.name).toBe(
    "BfsController"
  );
  boardManager.setAlgorithmController(new DfsController());
  expect(boardManager.getAlgorithmController().constructor.name).toBe(
    "DfsController"
  );
});
