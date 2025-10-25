import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiHome, FiSettings } from 'react-icons/fi';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      {/* Left side - Menu toggle and Logo */}
      <div className="navbar-start">
        <button
          className="btn btn-square btn-ghost"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>
        
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost text-xl font-bold ml-2"
        >
          Algorithm Visualizer
        </button>
      </div>

      {/* Center - Navigation tabs */}
      <div className="navbar-center hidden lg:flex">
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
            className={`tab ${isActive("/manualPathfinding") ? "tab-active" : ""}`}
          >
            Manual Pathfinding
          </button>
          <button
            onClick={() => navigate("/autoPathfinding")}
            className={`tab ${isActive("/autoPathfinding") ? "tab-active" : ""}`}
          >
            Auto Pathfinding
          </button>
        </div>
      </div>

      {/* Right side - Theme and Settings */}
      <div className="navbar-end">
        {/* Theme toggle - we'll implement this later */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FiSettings size={20} />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Theme Settings</a></li>
            <li><a>Preferences</a></li>
            <li><a>About</a></li>
          </ul>
        </div>

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => navigate("/")}>Home</a></li>
            <li><a onClick={() => navigate("/manualPathfinding")}>Manual Pathfinding</a></li>
            <li><a onClick={() => navigate("/autoPathfinding")}>Auto Pathfinding</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;