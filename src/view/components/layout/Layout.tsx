import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import LoadingBar from "./LoadingBar";
import { BoardController } from "../../../controller/interfaces/boardController";
import TopControls from "./TopControls";

interface LayoutProps {
  boardController: BoardController;
}

const Layout: React.FC<LayoutProps> = ({ boardController }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Expose animation state setter to boardController
  React.useEffect(() => {
    // Store the setter on the controller for external access
    (boardController as any).setAnimatingCallback = setIsAnimating;
  }, [boardController]);

  return (
    <div className="min-h-screen app-background">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Loading indicator bar */}
      <LoadingBar isLoading={isAnimating} />

      {/* Secondary Controls Bar for pathfinding pages */}
      <TopControls boardController={boardController} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
