import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class TopToLeftTurn extends CellDecorator {
  animate(): any {
    return (
      <motion.div>
        <motion.div
          className={`.,
           mr-[0px] mb-[0px] w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
          initial={{ scaleY: 0, y: "100%" }}
          animate={this.animateControls.y}
        >
          <motion.div
            className={`w-[1rem] ml-[0px] mt-[0px]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
            initial={{ scaleX: 0, x: "100%" }}
            animate={this.animateControls.x}
          ></motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
