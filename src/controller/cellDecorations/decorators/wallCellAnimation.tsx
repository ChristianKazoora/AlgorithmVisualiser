import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class WallCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        id={`cell-${this.x}-${this.y}`}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" bg-black")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      />
    );
  }
}
