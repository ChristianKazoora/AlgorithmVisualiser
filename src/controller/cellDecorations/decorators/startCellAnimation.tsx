import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
import { SlRocket } from "react-icons/sl";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}`}
        key={this.y}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id={`cell-${this.x}-${this.y}-animation`}
          style={{ background: "blue" }}
          className="hidden"
        >
          <div className="bg-white w-[1.1rem] h-[1.1rem] rounded-full">
            <SlRocket className="  justify-center ml-[0.08rem] mt-[0.2rem] h-[0.8rem]" />
          </div>
        </div>
      </div>
    );
  }
}
