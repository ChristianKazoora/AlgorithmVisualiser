import { useEffect } from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { BoardManager } from "../../controller/board/boardManager";
function PathFindingPage() {
  const boardController: BoardController = new BoardManager(50);
  useEffect(() => {
    boardController.addEventListeners();
    // boardController.animatePath();
  }, [boardController]);

  return (
    <div>
      path finding
      <button
        className="btn bg-red-400"
        onClick={() => boardController.animatePath()}
      >
        play
      </button>
      {boardController.draw()}
    </div>
  );
}

export default PathFindingPage;
