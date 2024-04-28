import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { Line } from "./line";
export class MainPath extends CellDecorator {
  animate(): any {
    this.classNames = " bg-red-500";
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {new Line(this, this.animateControls).animate()}
      </Grid>
    );
  }
}
