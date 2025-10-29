import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { WallCellAnimation } from "../decorators/wallCellAnimation";
import { StartCellAnimation } from "../decorators/startCellAnimation";
import { EndCellAnimation } from "../decorators/endCellAnimation";

/**
 * VisitedPath class that extends CellDecorator to represent a visited path cell.
 */
export class VisitedPath extends CellDecorator {
  animate(): any {
    return (
      // <div
      //   id={`cell-${this.x}-${this.y}`}
      //   key={this.y}
      //   style={{
      //     width: "20px",
      //     height: "20px",
      //     border: "1px solid black",
      //   }}
      <Grid
        id={`cell-${this.x}-${this.y}`}
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={" flex justify-center items-center "}
        style={{
          width: "var(--dynamic-cell-size, 20px)",
          height: "var(--dynamic-cell-size, 20px)",
        }}
      >
        {new StartCellAnimation(this).animate()}
        {new EndCellAnimation(this).animate()}
        {new WallCellAnimation(this).animate()}
        <div style={{ zIndex: -10 }} id={`cell-${this.x}-${this.y}-path`}>
          {/* {new Line(this).animate()} */}
        </div>
        <div
          id={`cell-${this.x}-${this.y}-current`}
          style={{
            height: ".6rem",
            width: ".6rem",
            background: "yellow",
            borderRadius: "100%",
            zIndex: -10,
          }}
          className="hidden"
        />
        <div
          id={`cell-${this.x}-${this.y}-visited`}
          style={{
            background: "grey",
            width: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            height: "calc(var(--dynamic-cell-size, 20px) - 1px)",
            borderRadius: "100%",
            zIndex: -10,
          }}
          className="hidden"
        />
      </Grid>
    );
  }
}
