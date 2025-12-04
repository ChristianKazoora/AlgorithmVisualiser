import { BoardManager } from "./controller/board/boardManager";
import { BoardController } from "./controller/interfaces/boardController";
import Layout from "./view/components/layout/Layout";
import { NotificationProvider } from "./view/components/notifications/NotificationProvider";
import ErrorBoundary from "./view/components/notifications/ErrorBoundary";
import HomePage from "./view/pages/HomePage";
import AutoPathFindingPage from "./view/pages/autoPathfinding";
import ManualPathFindingPage from "./view/pages/manualPathfinding";
import { BoardSizeProvider } from "./contexts/BoardSizeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
                <Route index element={<HomePage />} />
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
