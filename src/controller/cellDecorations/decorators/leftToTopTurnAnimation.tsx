import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class LeftToTopTurn extends CellDecorator {
  animate(): any {
    return (
      <motion.div>
        <motion.div
          className={` ml-[0px] mt-[0px] w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames}`}
          initial={{ scaleY: 0, y: "100%" }} // initial state
          animate={this.animateControls.y} // animate to this state
          // transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        >
          <motion.div
            className={`  w-[1rem] mt-[0px] ml-[0px] h-[0.5rem] bg-black rounded-[3.5px] ${this.classNames}`}
            initial={{ scaleX: 0, x: "-100%" }} // initial state
            animate={this.animateControls.x} // animate to this state
            // transition={{ duration: this.posFromStart * 0.01 }} // transition duration
          />
        </motion.div>
      </motion.div>
    );
  }
}
