import { BoardManager } from "./controller/board/boardManager";
import { BoardController } from "./controller/interfaces/boardController";
import { AutoCellState } from "./controller/pathfindingCellStates/auto/autoCellState";
import { ManualCellState } from "./controller/pathfindingCellStates/manual/manualCellState";
import Line from "./test/line";
import Navbar from "./view/components/navbar";
import AutoPathFindingPage from "./view/pages/autoPathfinding";
import ManualPathFindingPage from "./view/pages/manualPathfinding";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useLocation,
} from "react-router-dom";

function App() {
  let boardController: BoardController = new BoardManager();

  return (
    <BrowserRouter>
      <Navbar boardController={boardController} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Link
                to={"/manualPathfinding"}
                className=" btn text-2xl bg-fuchsia-400"
              >
                Manual Pathfinding
              </Link>
              <Link
                to={"/autoPathfinding"}
                className=" btn text-2xl bg-fuchsia-400"
              >
                Auto Pathfinding
              </Link>
              {/* Line */}
              <Line />
            </div>
          }
        />
        <Route
          path="/manualPathfinding"
          element={<ManualPathFindingPage boardController={boardController} />}
        />
        <Route
          path="/autoPathfinding"
          element={<AutoPathFindingPage boardController={boardController} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
