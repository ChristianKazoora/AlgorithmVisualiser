import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
function ManualPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  useEffect(() => {
    boardController.addEventListeners();
  }, [boardController]);
  return (
    <div>
      path finding
      {boardController.draw()}
    </div>
  );
}

export default ManualPathFindingPage;
