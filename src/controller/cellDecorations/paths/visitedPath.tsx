import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { motion } from "framer-motion";
import { Line } from "./line";
import { WallCellAnimation } from "../decorators/wallCellAnimation";
import { StartCellAnimation } from "../decorators/startCellAnimation";
import { EndCellAnimation } from "../decorators/endCellAnimation";

export class VisitedPath extends CellDecorator {
  animate(): any {
    return (
      // <div
      //   id={`cell-${this.x}-${this.y}`}
      //   key={this.y}
      //   style={{
      //     width: "20px",
      //     height: "20px",
      //     border: "1px solid black",
      //   }}
      <Grid
        id={`cell-${this.x}-${this.y}`}
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        // className={" flex justify-center items-center"}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        {new StartCellAnimation(this).animate()}
        {new EndCellAnimation(this).animate()}
        {new WallCellAnimation(this).animate()}
        <div id={`cell-${this.x}-${this.y}-path`}>
          {/* {new Line(this).animate()} */}
        </div>
        <div
          id={`cell-${this.x}-${this.y}-current`}
          style={{ height: "1rem", background: "yellow" }}
          className="hidden"
        />
        <div
          id={`cell-${this.x}-${this.y}-visited`}
          style={{
            background: "grey",
            height: "1.13rem",
            borderRadius: "20%",
          }}
          className="hidden"
        />
      </Grid>
    );
  }
}
