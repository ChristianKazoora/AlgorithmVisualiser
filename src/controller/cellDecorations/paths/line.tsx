import { Cell } from "../../../model/subject/Cell";
import { CellDecorator } from "../cellDecorator";
import { PathConfig } from "../pathConfig";
import { renderCellPathSegment } from "./svgPathRenderer";

/**
 * Line class that extends CellDecorator to render SVG path segments.
 * Uses the SVG path renderer to draw lines based on cell connections.
 */
export class Line extends CellDecorator {
  private cell: Cell;

  constructor(cell: Cell) {
    super(cell);
    this.cell = cell;
  }

  animate(): any {
    const segment = renderCellPathSegment(this.cell, {
      strokeColor: PathConfig.SVG.STROKE_COLOR,
      strokeWidth: PathConfig.SVG.STROKE_WIDTH,
      strokeLinecap: PathConfig.SVG.STROKE_LINECAP,
      strokeLinejoin: PathConfig.SVG.STROKE_LINEJOIN,
    });

    if (!segment) {
      return null;
    }

    return (
      <div
        className="flex justify-center items-center"
        style={{
          width: "var(--dynamic-cell-size, 20px)",
          height: "var(--dynamic-cell-size, 20px)",
          zIndex: PathConfig.Z_INDEX.PATH_BASE,
        }}
      >
        {segment}
      </div>
    );
  }
}
