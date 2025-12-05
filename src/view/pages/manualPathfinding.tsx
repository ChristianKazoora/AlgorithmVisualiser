import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { ManualCellState } from "../../controller/pathfindingCellStates/manual/manualCellState";
import { ManualGridRenderer } from "../../controller/pathfindingCellStates/renderer/manualGridRender";
// import { GetManulNeighbours } from "../../model/subject/board/strategies/manual/getManulNeighbours";
import { GetManulNeigbourWD } from "../../model/subject/board/strategies/manual/getManulNeigbourWD";
import BoardGrid from "../components/board/BoardGrid";

function ManualPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  boardController.setCellState(
    new ManualCellState(),
    new ManualGridRenderer(),
    new GetManulNeigbourWD()
  );
  useEffect(() => {
    boardController.addEventListeners();
  }, [boardController]);

  return (
    <div className="flex flex-col items-center h-full max-h-full overflow-hidden">
      <div className="text-center py-2 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
          Manual Pathfinding
        </h1>
        <p className="text-sm text-base-content/70">
          Click and drag to create walls, then run the algorithm
        </p>
      </div>

      <div className="w-full flex-1 flex justify-center items-start overflow-hidden px-2">
        <BoardGrid controller={boardController} />
      </div>
    </div>
  );
}

export default ManualPathFindingPage;
