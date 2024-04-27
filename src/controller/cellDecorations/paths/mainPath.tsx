import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { TurnHelper } from "../../pathfindingCellStates/turnHelper";
import { up_Down } from "../decorations/up_DownAnimation";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Left_Right } from "../decorations/left_RightAnimation";
export class MainPath extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" bg-red-500")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* if cell is going left-right or up-down */}
        <motion.div>
          {TurnHelper.left_Right(this)
            ? new Left_Right(this, this.animateControls).animate()
            : ""}
          {TurnHelper.up_Down(this)
            ? new up_Down(this, this.animateControls).animate()
            : ""}
        </motion.div>
      </Grid>
    );
  }
}
