import { BoardManager } from "./controller/board/boardManager";
import { BoardController } from "./controller/interfaces/boardController";
import Navbar from "./view/components/navbar";
import ManualPathFindingPage from "./view/pages/manualPathfinding";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const boardController: BoardController = new BoardManager();

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
            </div>
          }
        />
        <Route
          path="/manualPathfinding"
          element={<ManualPathFindingPage boardController={boardController} />}
        />
        <Route
          path="/autoPathfinding"
          element={<div className="alert alert-success">Auto Pathfinding</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//  <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
