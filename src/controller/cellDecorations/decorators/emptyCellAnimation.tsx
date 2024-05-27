import { ICellAnimation } from "../../interfaces/cellAnimation";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
import { WallCellAnimation } from "./wallCellAnimation";
export class EmptyCellAnimation
  extends CellDecorator
  implements ICellAnimation
{
  animate(): any {
    return (
      <Grid
        id={`cell-${this.x}-${this.y}`}
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        // className={`${this.classNames.concat("  bg-white")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        {/* <div id={`cell-${this.x}-${this.y}-animation`} /> */}
        {new WallCellAnimation(this).animate()}
      </Grid>
    );
  }
}
