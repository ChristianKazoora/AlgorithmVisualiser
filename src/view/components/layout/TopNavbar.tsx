import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiSettings, FiInfo } from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [showAbout, setShowAbout] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };

  return (
    <>
      <div className="navbar bg-primary text-primary-content shadow-lg">
        {/* Left side - Logo */}
        <div className="navbar-start">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost text-xl font-bold"
          >
            Algorithm Visualizer
          </button>
        </div>

        {/* Center - Navigation tabs */}
        <div className="navbar-center hidden md:flex">
          <div className="tabs tabs-boxed bg-primary-content/20">
            <button
              onClick={() => navigate("/")}
              className={`tab ${isActive("/") ? "tab-active" : ""}`}
            >
              <FiHome className="mr-2" size={16} />
              Home
            </button>
            <button
              onClick={() => navigate("/manualPathfinding")}
              className={`tab ${
                isActive("/manualPathfinding") ? "tab-active" : ""
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => navigate("/autoPathfinding")}
              className={`tab ${
                isActive("/autoPathfinding") ? "tab-active" : ""
              }`}
            >
              Auto
            </button>
          </div>
        </div>

        {/* Right side - Settings and Mobile menu */}
        <div className="navbar-end gap-1">
          {/* Theme dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              title="Theme"
            >
              <IoColorPaletteOutline size={20} />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-56 max-h-80 overflow-y-auto"
            >
              <div className="p-2 text-sm font-semibold border-b border-base-300 mb-2">
                Select Theme
              </div>
              <div className="grid grid-cols-2 gap-1">
                {THEMES.map((theme) => (
                  <button
                    key={theme}
                    className={`btn btn-sm btn-ghost justify-start capitalize ${
                      currentTheme === theme ? "btn-active" : ""
                    }`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              title="Settings"
            >
              <FiSettings size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52"
            >
              <li>
                <button onClick={() => setShowAbout(true)}>
                  <FiInfo size={16} />
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile menu */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52"
            >
              <li>
                <a onClick={() => navigate("/")}>Home</a>
              </li>
              <li>
                <a onClick={() => navigate("/manualPathfinding")}>
                  Manual Pathfinding
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/autoPathfinding")}>
                  Auto Pathfinding
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">About Algorithm Visualizer</h3>
            <p className="py-4">
              A visual tool for exploring pathfinding algorithms like BFS, DFS,
              and A*. Built with React, TypeScript, and DaisyUI.
            </p>
            <div className="py-2">
              <h4 className="font-semibold">Algorithms:</h4>
              <ul className="list-disc list-inside text-sm mt-1">
                <li>
                  <strong>BFS</strong> - Breadth-First Search, guarantees
                  shortest path
                </li>
                <li>
                  <strong>DFS</strong> - Depth-First Search, explores deeply
                  first
                </li>
                <li>
                  <strong>A*</strong> - Uses heuristics for optimal pathfinding
                </li>
              </ul>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowAbout(false)}>
                Close
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowAbout(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default TopNavbar;
