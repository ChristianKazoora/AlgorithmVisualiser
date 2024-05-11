import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid, touchRippleClasses } from "@mui/material";
export class TopToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <motion.div>
        <motion.div
          className={`w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
          initial={{ scaleY: 0, y: "-100%" }}
          animate={this.animateControls.y}
        >
          <motion.div
            className={` w-[1rem]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
            initial={{ scaleX: 0, x: "-100%" }}
            animate={this.animateControls.x}
          ></motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
