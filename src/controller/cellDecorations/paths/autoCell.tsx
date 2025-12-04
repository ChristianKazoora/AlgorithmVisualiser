import { CellDecorator } from "../cellDecorator";
import { StartCellAnimation } from "../decorators/startCellAnimation";
import { EndCellAnimation } from "../decorators/endCellAnimation";
import { WallCellAnimation } from "../decorators/wallCellAnimation";
import { Line } from "./line";
import { Grid } from "@mui/material";

/**
 * AutoCell class that extends CellDecorator to represent an automatic path cell.
 */
export class AutoCell extends CellDecorator {
  animate(): JSX.Element {
    return (
      <Grid
        id={`cell-${this.x}-${this.y}`}
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className="relative flex justify-center items-center"
        style={{
          width: "var(--dynamic-cell-size, 20px)",
          height: "var(--dynamic-cell-size, 20px)",
        }}
      >
        {new StartCellAnimation(this).animate()}
        {new EndCellAnimation(this).animate()}
        {new WallCellAnimation(this).animate()}
        <div className="absolute" id={`cell-${this.x}-${this.y}-path`}>
          {new Line(this).animate()}
        </div>
        <div
          id={`cell-${this.x}-${this.y}-current`}
          className="hidden bg-warning rounded-full absolute"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            height: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            zIndex: 5,
          }}
        />
        <div
          id={`cell-${this.x}-${this.y}-visited`}
          className="hidden bg-neutral rounded-full absolute"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            height: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            zIndex: 1,
          }}
        />
      </Grid>
    );
  }
}

export default AutoCell;
