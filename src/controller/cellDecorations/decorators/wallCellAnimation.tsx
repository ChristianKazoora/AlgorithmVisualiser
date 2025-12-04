import { CellDecorator } from "../cellDecorator";
export class WallCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}-wall`}
        className="hidden absolute bg-base-content"
        style={{
          width: "calc(var(--dynamic-cell-size, 20px))",
          height: "calc(var(--dynamic-cell-size, 20px))",
          zIndex: 10,
        }}
      />
    );
  }
}
