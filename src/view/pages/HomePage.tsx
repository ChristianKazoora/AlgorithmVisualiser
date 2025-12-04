import React from "react";
import { Link } from "react-router-dom";
import { HiCursorClick } from "react-icons/hi";
import { IoFlashOutline } from "react-icons/io5";
import { FiTarget, FiGrid, FiZap, FiCompass } from "react-icons/fi";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Algorithm Visualizer
        </h1>
        <p className="text-lg text-base-content/70">
          Watch pathfinding algorithms explore and find the shortest path in
          real-time. Compare BFS, DFS, and A* to understand how they work.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl w-full">
        {/* Manual Mode Card */}
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-lg">
                <HiCursorClick className="w-8 h-8 text-primary" />
              </div>
              <h2 className="card-title text-2xl">Manual Mode</h2>
            </div>
            <p className="text-base-content/70 mt-2">
              Draw your own walls and obstacles. Click and drag to create
              barriers, then watch the algorithm navigate around them.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <FiTarget className="text-primary" /> Custom wall placement
              </li>
              <li className="flex items-center gap-2">
                <FiCompass className="text-primary" /> Optional diagonal
                movement
              </li>
            </ul>
            <div className="card-actions justify-end mt-4">
              <Link to="/manualPathfinding" className="btn btn-primary">
                Start Manual
              </Link>
            </div>
          </div>
        </div>

        {/* Auto Mode Card */}
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <IoFlashOutline className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="card-title text-2xl">Auto Mode</h2>
            </div>
            <p className="text-base-content/70 mt-2">
              Generate perfect mazes automatically. Watch the maze being carved
              out, then see the algorithm solve it step by step.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <FiGrid className="text-secondary" /> Procedural maze generation
              </li>
              <li className="flex items-center gap-2">
                <FiZap className="text-secondary" /> Animated maze creation
              </li>
            </ul>
            <div className="card-actions justify-end mt-4">
              <Link to="/autoPathfinding" className="btn btn-secondary">
                Start Auto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="mt-12 max-w-4xl w-full">
        <h3 className="text-xl font-semibold text-center mb-6">
          Available Algorithms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-base-200 rounded-lg p-4 text-center">
            <div className="font-bold text-primary">BFS</div>
            <div className="text-sm text-base-content/70">
              Breadth-First Search. Explores level by level, guarantees shortest
              path.
            </div>
          </div>
          <div className="bg-base-200 rounded-lg p-4 text-center">
            <div className="font-bold text-primary">DFS</div>
            <div className="text-sm text-base-content/70">
              Depth-First Search. Explores deeply first, may not find shortest
              path.
            </div>
          </div>
          <div className="bg-base-200 rounded-lg p-4 text-center">
            <div className="font-bold text-primary">A*</div>
            <div className="text-sm text-base-content/70">
              Uses heuristics for smart exploration, optimal and efficient.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
