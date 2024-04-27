import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class LeftToBottomTurn extends CellDecorator {
  animate(): any {
    return (
      <Grid
        item
        xs={0}
        key={this.y}
        data-row={this.x}
        data-col={this.y}
        className={`${this.classNames.concat("")} `}
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid black",
        }}
      >
        <motion.div>
          <motion.div
            className="absolute ml-[5px] w-[0.5rem] h-[1rem] bg-black rounded-[3.5px]"
            initial={{ scaleY: 0, y: "-100%" }} // initial state
            animate={{ y: 0, scaleY: 1 }} // animate to this state
            transition={{ duration: this.posFromStart * 0.01 }} // transition duration
          />
          <motion.div
            className=" w-[1rem] mt-[5px] ml-[-5px] h-[0.5rem] bg-black rounded-[3.5px]"
            initial={{ scaleX: 0, x: "-100%" }} // initial state
            animate={{ x: 0, scaleX: 1 }} // animate to this state
            transition={{ duration: this.posFromStart * 0.01 }} // transition duration
          />
        </motion.div>
      </Grid>
    );
  }
}
