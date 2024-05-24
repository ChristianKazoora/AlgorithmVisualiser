import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class WallCellAnimation extends CellDecorator {
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
          style={{ background: "black" }}
          className="hidden"
        >
          <div className="bg-white w-[1.1rem] h-[1.1rem] rounded-full"></div>
        </div>
      </div>
    );
  }
}
