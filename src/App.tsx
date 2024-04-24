import { useState } from "react";
import "./App.css";
import PathFindingPage from "./view/pages/pathfinding";
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-red-400 underline">
        Hello world!
      </h1>

      <PathFindingPage />
    </>
  );
}

export default App;
