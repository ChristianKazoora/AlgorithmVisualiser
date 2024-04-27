import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid, touchRippleClasses } from "@mui/material";
export class TopToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat(" ")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Add this line
        }}
      >
        <motion.div>
          <motion.div
            className="absolute ml-[-4px] mt-[2px] w-[0.5rem] h-[1rem] bg-black rounded-[3.5px]"
            initial={{ scaleY: 0, y: "-100%" }}
            animate={this.animateControls.y}
          >
            <motion.div
              className="absolute z-10 w-[1rem] ml-[17px] mt-[10px]  h-[0.5rem] bg-black rounded-[3.5px]"
              initial={{ scaleX: 0, x: "-100%" }}
              animate={this.animateControls.x}
            ></motion.div>
          </motion.div>
        </motion.div>
      </Grid>
    );
  }
}
