import { BoardManager } from "./controller/board/boardManager";
import { BoardController } from "./controller/interfaces/boardController";
// import { AutoCellState } from "./controller/pathfindingCellStates/auto/autoCellState";
// import { ManualCellState } from "./controller/pathfindingCellStates/manual/manualCellState";
import Line from "./test/line";
import Layout from "./view/components/layout/Layout";
import { NotificationProvider } from "./view/components/notifications/NotificationProvider";
import ErrorBoundary from "./view/components/notifications/ErrorBoundary";
import { HiCursorClick } from "react-icons/hi";
import { IoFlashOutline } from "react-icons/io5";

import AutoPathFindingPage from "./view/pages/autoPathfinding";
import ManualPathFindingPage from "./view/pages/manualPathfinding";
import { BoardSizeProvider } from "./contexts/BoardSizeContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useLocation,
} from "react-router-dom";

function App() {
  const boardController: BoardController = new BoardManager();

  return (
    <ErrorBoundary>
      <BoardSizeProvider>
        <NotificationProvider>
          {/* <NotificationDemo /> */}

          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Layout boardController={boardController} />}
              >
                <Route
                  index
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                      <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-primary">
                          Algorithm Visualizer
                        </h1>
                        <p className="text-lg text-base-content/70 max-w-2xl">
                          Visualize pathfinding algorithms in action. Choose
                          between manual and automatic modes to explore how
                          different algorithms find the shortest path.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={"/manualPathfinding"}
                          className="btn btn-primary btn-lg"
                        >
                          <HiCursorClick className="w-5 h-5 mr-2" />
                          Manual Pathfinding
                        </Link>
                        <Link
                          to={"/autoPathfinding"}
                          className="btn btn-secondary btn-lg"
                        >
                          <IoFlashOutline className="w-5 h-5 mr-2" />
                          Auto Pathfinding
                        </Link>
                      </div>

                      {/* Demo Component */}
                      <div className="mt-8">
                        <Line />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/manualPathfinding"
                  element={
                    <ManualPathFindingPage boardController={boardController} />
                  }
                />
                <Route
                  path="/autoPathfinding"
                  element={
                    <AutoPathFindingPage boardController={boardController} />
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </BoardSizeProvider>
    </ErrorBoundary>
  );
}

export default App;
