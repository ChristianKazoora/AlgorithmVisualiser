import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { AutoCellState } from "../../controller/pathfindingCellStates/auto/autoCellState";
import { AutoGridRenderer } from "../../controller/pathfindingCellStates/renderer/autoGridRender";
import { GetAutoNeigbour } from "../../model/subject/board/strategies/auto/getAutoNeigbours";
import BoardGrid from "../components/board/BoardGrid";

function AutoPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  useEffect(() => {
    boardController.addEventListeners();
  }, [boardController]);

  boardController.setCellState(
    new AutoCellState(),
    new AutoGridRenderer(),
    new GetAutoNeigbour()
  );

  return (
    <div className="flex flex-col items-center h-full max-h-full overflow-hidden">
      <div className="text-center py-2 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
          Auto Pathfinding
        </h1>
        <p className="text-sm text-base-content/70">
          Watch algorithms automatically find the optimal path
        </p>
      </div>

      <div className="w-full flex-1 flex justify-center items-start overflow-hidden px-2">
        <BoardGrid controller={boardController} />
      </div>
    </div>
  );
}

export default AutoPathFindingPage;
