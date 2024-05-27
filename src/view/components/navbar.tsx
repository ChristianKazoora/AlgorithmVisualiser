import { BoardController } from "../../controller/interfaces/boardController";

function Navbar({ boardController }: { boardController: BoardController }) {
  return (
    <div className="flex justify-center">
      <div className="navbar rounded-3xl w-[70%] bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2  navbar-start ">
          <span className="text-lg font-bold">Algo Visualizer</span>
        </div>
        <select className="select select-success navbar-center max-w-xs">
          <option disabled>
            {/* <div className=" text-red-500"> Pick your favorite anime</div> */}
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
          className="btn  text-lg  "
          onClick={() => boardController.animatePath()}
        >
          play
        </button>
        <div className=" form-control w-52  navbar-end">
          <label className="cursor-pointer label font-bold">
            <span className=" pr-[10px]">MANUAL</span>
            <input type="checkbox" className="toggle" />
            <span className="pl-[10px]">AUTO</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
