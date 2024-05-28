import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { AutoCellState } from "../../controller/pathfindingCellStates/auto/autoCellState";
import { AutoGridRenderer } from "../../controller/pathfindingCellStates/renderer/autoGridRender";
function AutoPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  //   useEffect(() => {
  //     boardController.addEventListeners();
  //   }, [boardController]);
  boardController.setCellState(new AutoCellState(), new AutoGridRenderer());
  return (
    <div>
      Auto path finding
      {boardController.draw()}
    </div>
  );
}

export default AutoPathFindingPage;
