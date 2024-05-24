import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { motion } from "framer-motion";
import { Line } from "./line";

export class VisitedPath extends CellDecorator {
  animate(): any {
    return (
      <div
        id={`cell-${this.x}-${this.y}`}
        key={this.y}
        // className={`  `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        {new Line(this).animate()}
        <div
          id={`cell-${this.x}-${this.y}-current`}
          style={{ height: "1rem", background: "yellow" }}
          className="hidden"
        />
        <div
          id={`cell-${this.x}-${this.y}-visited`}
          style={{ background: "grey", height: "1rem", borderRadius: "100%" }}
          className="hidden"
        />
      </div>
    );
  }
}
