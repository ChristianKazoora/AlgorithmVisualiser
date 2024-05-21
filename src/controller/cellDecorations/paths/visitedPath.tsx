import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { motion } from "framer-motion";
import { Line } from "./line";

export class VisitedPath extends CellDecorator {
  animate(): any {
    {
      console.log("visited path");
    }

    return (
      <Grid
        id={`cell-${this.x}-${this.y}`}
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        // className={`flex justify-center align-middle } `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        <div
          id={`cell-${this.x}-${this.y}-animation`}
          className={`bg-slate-500 h-[1.13rem]`}
          // animate={this.animateControls.x}
          // initial={{ scaleX: 0, x: "100%" }} // initial state
        />
        {/* {new Line(this, this.animateControls).animate()} */}
      </Grid>
    );
  }
}
