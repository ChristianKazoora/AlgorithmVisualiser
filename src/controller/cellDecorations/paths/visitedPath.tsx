import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { motion } from "framer-motion";
import { Line } from "./line";

export class VisitedPath extends CellDecorator {
  animate(): any {
    this.classNames = " bg-slate-500 ";

    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        // className={`${this.classNames.concat(" ")} `}
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
        {/* {new Line(this, this.animateControls).animate()} */}

        <motion.div
          animate={this.animateControls.x}
          className="ml-[0px] mt-[0px] w-[1rem] relative bg-slate-500  h-[1rem] rounded-full"
          initial={{ scaleX: 0, x: "100%" }} // initial state
        />
        {/* {new Line(this, this.animateControls).animate()} */}
      </Grid>
    );
  }
}
