import { useNavigate, useLocation, Link } from "react-router-dom";
import { BoardController } from "../../controller/interfaces/boardController";
import React from "react";
function Navbar({ boardController }: { boardController: BoardController }) {
  const location = useLocation();
  const navigate = useNavigate();

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
        <select className="select select-success navbar-center max-w-xs">
          <option disabled>
            {/* /* <option className=" text-red-500"> Pick your favorite anime</option> */}
          </option>
          <option>One Piece</option>
          <option>Naruto</option>
          <option>Death Note</option>
          <option>Attack on Titan</option>
          <option>Bleach</option>
          <option>Fullmetal Alchemist</option>
          <option>Jojo's Bizarre Adventure</option>
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
    </div>
  );
}

export default Navbar;
