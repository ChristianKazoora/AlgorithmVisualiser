import { CellDecorator } from "../cellDecorator";
export class WallCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}-wall`}
        style={{ background: "black" }}
        className="hidden"
      >
        <div
          className="bg-black"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) - 2px)",
            height: "calc(var(--dynamic-cell-size, 20px) - 2px)",
          }}
        />
      </div>
    );
  }
}
