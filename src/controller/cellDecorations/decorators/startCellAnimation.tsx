import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
import { SlRocket } from "react-icons/sl";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        id={`cell-${this.x}-${this.y}`}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        <div
          className="flex bg-blue-500 justify-center items-center w-full h-full"
          id={`cell-${this.x}-${this.y}-animation`}
        >
          <div className="bg-white w-[1.1rem] h-[1.1rem] rounded-full">
            <SlRocket className="  justify-center ml-[0.08rem] mt-[0.2rem] h-[0.8rem]" />
          </div>
        </div>
      </Grid>
    );
  }
}
