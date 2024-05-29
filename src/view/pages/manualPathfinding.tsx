import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { ManualCellState } from "../../controller/pathfindingCellStates/manual/manualCellState";
import { ManualGridRenderer } from "../../controller/pathfindingCellStates/renderer/manualGridRender";
import { GetManulNeighbours } from "../../model/subject/board/strategies/manual/getManulNeighbours";
function ManualPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  boardController.setCellState(
    new ManualCellState(),
    new ManualGridRenderer(),
    new GetManulNeighbours()
  );
  useEffect(() => {
    boardController.addEventListeners();
  }, [boardController]);
  return (
    <div>
      Manual path finding
      {boardController.draw()}
    </div>
  );
}

export default ManualPathFindingPage;
