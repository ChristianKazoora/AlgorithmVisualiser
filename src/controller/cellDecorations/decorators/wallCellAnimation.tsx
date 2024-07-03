import { CellDecorator } from "../cellDecorator";
export class WallCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}-wall`}
        style={{ background: "black" }}
        className="hidden"
      >
        <div className=" bg-black w-[1.1rem] h-[1.13rem] "></div>
      </div>
    );
  }
}
