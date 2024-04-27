import React from "react";
import { BoardController } from "../../controller/interfaces/boardController";
import { BoardManager } from "../../controller/board/boardManager";
function PathFindingPage() {
  const boardController: BoardController = new BoardManager(50);
  return <div>path finding {boardController.draw()}</div>;
}

export default PathFindingPage;
