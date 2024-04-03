import HomePage from "./pages/HomePage";
import PathFinderPage from "./pages/PathFindAlgo";
import SearchAlgoPage from "./pages/SearchAlgo";
import SortAlgoPage from "./pages/SortAlgo";
import Layout from "./components/layout/Layout";
import Menu from "./components/Menu/Menu";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        {/*      <Routes>
          <Route
            path="/"
            element={
              <HomePage>
                <Menu page="/" />
              </HomePage>
            }
          />
          <Route
            path="/pathfind-algo"
            element={
              <PathFinderPage>
                <Menu page="/pathfind-algo" />
              </PathFinderPage>
            }
          />
          <Route
            path="/search-algo"
            element={
              <SearchAlgoPage>
                <Menu page="/search-algo" />
              </SearchAlgoPage>
            }
          />
          <Route
            path="/sort-algo"
            element={
              <SortAlgoPage>
                <Menu page="/sort-algo" />
              </SortAlgoPage>
            }
          />
        </Routes>*/}
        <Menu page={"/"} />
      </div>
    </div>
  );
}

export default App;
