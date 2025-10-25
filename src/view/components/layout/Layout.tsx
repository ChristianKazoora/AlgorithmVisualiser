import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import { BoardController } from "../../../controller/interfaces/boardController";
import TopControls from "./TopControls";

interface LayoutProps {
  boardController: BoardController;
}

const Layout: React.FC<LayoutProps> = ({ boardController }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isPathfindingPage = useMemo(
    () =>
      location.pathname === "/manualPathfinding" ||
      location.pathname === "/autoPathfinding",
    [location.pathname]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen app-background">
      {/* Top Navbar */}
      <TopNavbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Secondary Controls Bar for pathfinding pages */}
      <TopControls boardController={boardController} />

      <div className="flex">
        {/* Sidebar: hidden on pathfinding pages to avoid conflicts */}
        {!isPathfindingPage && (
          <Sidebar isOpen={isSidebarOpen} boardController={boardController} />
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
