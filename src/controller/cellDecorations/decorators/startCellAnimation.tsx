import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
import { SlRocket } from "react-icons/sl";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" bg-blue-500")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-white w-[1.1rem] h-[1.1rem] rounded-full">
            <SlRocket className="  justify-center ml-[0.08rem] mt-[0.2rem] h-[0.8rem]" />
          </div>
        </div>
      </Grid>
    );
  }
}