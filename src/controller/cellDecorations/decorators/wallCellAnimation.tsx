import { CellDecorator } from "../cellDecorator";
export class WallCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}-wall`}
        style={{ background: "black", zIndex: -10 }}
        className="hidden"
      >
        <div
          className="bg-black"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) )",
            height: "calc(var(--dynamic-cell-size, 20px) )",
            zIndex: -10,
          }}
        />
      </div>
    );
  }
}
