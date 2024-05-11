import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";

export class BottomToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <motion.div>
        <motion.div
          className={` w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames}`}
          initial={{ scaleY: 0, y: "100%" }} // initial state
          animate={this.animateControls.y} // animate to this state
          transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        >
          <motion.div
            className={` w-[1rem]  h-[0.5rem] rounded-[3.5px] ${this.classNames}`}
            initial={{ scaleX: 0, x: "-100%" }} // initial state
            animate={this.animateControls.x} // animate to this state
            transition={{ duration: this.posFromStart * 0.01 }} // transition duration
          />
        </motion.div>
      </motion.div>
    );
  }
}
