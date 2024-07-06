import { useNavigate, useLocation } from "react-router-dom";
import { BoardController } from "../../controller/interfaces/boardController";
import { BfsController } from "../../controller/pathfindingCellStates/algoControllers/bfsController";
import { DfsController } from "../../controller/pathfindingCellStates/algoControllers/dfsController";
import { A_StarController } from "../../controller/pathfindingCellStates/algoControllers/aStarController";
import { GetManulNeighbours } from "../../model/subject/board/strategies/manual/getManulNeighbours";
import { GetManulNeigbourWD } from "../../model/subject/board/strategies/manual/getManulNeigbourWD";
import { useState } from "react";
function Navbar({ boardController }: { boardController: BoardController }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isManual, setIsManual] = useState(true);
  const handleToggleChange = () => {
    if (location.pathname === "/autoPathfinding") {
      return;
    }
    if (isManual) {
      boardController.setMovementModel(new GetManulNeighbours());
    } else {
      boardController.setMovementModel(new GetManulNeigbourWD());
    }
    setIsManual(!isManual);
  };
  let toggoleColor =
    location.pathname === "/manualPathfinding"
      ? "bg-blue-500"
      : location.pathname === "/autoPathfinding"
        ? "bg-green-500"
        : "";
  let toggoleHoverColor =
    location.pathname === "/manualPathfinding"
      ? "hover:bg-green-700"
      : location.pathname === "/autoPathfinding"
        ? "hover:bg-blue-700"
        : "";
  let hidetoggle = "hidden";

  if (
    location.pathname === "/manualPathfinding" ||
    location.pathname === "/autoPathfinding"
  ) {
    hidetoggle = "block";
  }
  return (
    <div className="flex justify-center">
      <div className="navbar rounded-3xl w-[70%] bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2  navbar-start ">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-lg font-bold"
          >
            Algo Visualizer
          </span>
        </div>
        <select
          className="select select-success navbar-center w-[6rem]"
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue === "DFS") {
              boardController.setAlgorithmController(new DfsController());
              console.log("dfs");
            }
            if (selectedValue === "BFS") {
              boardController.setAlgorithmController(new BfsController());
              console.log("bfs");
            }
            if (selectedValue === "A*") {
              boardController.setAlgorithmController(new A_StarController());
              console.log("A*");
            }
            // Add more conditions for other options if necessary
          }}
        >
          {/* <option disabled>
            <option className=" text-red-500"> Pick your favorite anime</option>
          </option> */}
          <option>BFS</option>
          <option>DFS</option>
          <option>A*</option>
        </select>
        <button
          className="btn ml-[10px]  text-[1.2rem] p-[8px] "
          onClick={() => boardController.animatePath()}
        >
          RUN
        </button>
        <button
          className="ml-[10px] btn  text-lg p-[8px] "
          onClick={() => boardController.ganarateMaze()}
        >
          MAZE
        </button>

        <div className={` form-control w-52  navbar-end ${hidetoggle}`}>
          <label className="cursor-pointer label font-bold">
            <span className=" pr-[10px]">AUTO</span>

            <input
              id="toggle"
              type="checkbox"
              className={`toggle  border-blue-500 ${toggoleHoverColor} ${toggoleColor} `}
              onChange={() => {
                if (location.pathname === "/manualPathfinding") {
                  navigate("/autoPathfinding");
                } else if (location.pathname === "/autoPathfinding") {
                  navigate("/manualPathfinding");
                }
              }}
              checked={location.pathname === "/manualPathfinding"}
            />
            <span className="pl-[10px]">MANUAL</span>
          </label>
        </div>
      </div>
      <div
        className={` flex  items-center form-control w-52  navbar-end ${hidetoggle}`}
      >
        <span className="pl-[10px]">Diagonal</span>

        <label className="cursor-pointer label font-bold">
          <span className="px-[10px]">off</span>

          <input
            id="toggle"
            type="checkbox"
            className={`toggle  border-blue-500 ${toggoleHoverColor} ${toggoleColor} `}
            onChange={handleToggleChange}
            checked={isManual}
          />
          <span className="px-[10px]">on</span>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
