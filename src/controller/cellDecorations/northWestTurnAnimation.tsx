import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class NorthWestTurnAnimation extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" bg-slate-400")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      />
    );
  }
}
