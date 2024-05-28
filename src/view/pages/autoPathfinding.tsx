import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
function AutoPathFindingPage({
  boardController,
}: {
  boardController: BoardController;
}) {
  //   useEffect(() => {
  //     boardController.addEventListeners();
  //   }, [boardController]);
  return (
    <div>
      Auto path finding
      {boardController.draw()}
    </div>
  );
}

export default AutoPathFindingPage;
