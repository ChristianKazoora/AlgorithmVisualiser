import { Grid } from "@mui/material";
import { CellDecorator } from "../../cellDecorator";

export class MainPath extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" bg-red-950")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      />
    );
  }
}