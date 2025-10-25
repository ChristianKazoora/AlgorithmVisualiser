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
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Auto Pathfinding
        </h1>
        <p className="text-base-content/70">
          Watch algorithms automatically find the optimal path
        </p>
      </div>

      <div className="w-full flex justify-center">
        <BoardGrid controller={boardController} />
      </div>
    </div>
  );
}

export default AutoPathFindingPage;
