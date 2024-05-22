import { useState } from "react";
import "./App.css";
import PathFindingPage from "./view/pages/pathfinding";
function App() {
  return (
    <>
      <h1 className=" btn bg-slate-600 text-3xl font-bold text-red-400 underline">
        Hello world!
      </h1>

      <PathFindingPage />
    </>
  );
}

export default App;
