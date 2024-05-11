import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class TopToLeftTurn extends CellDecorator {
  animate(): any {
    return (
      <motion.div>
        <motion.div
          className={` mt-[-23px] ml-[5px] w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
          initial={{ scaleY: 0, y: "100%" }}
          animate={this.animateControls.y}
        >
          <motion.div
            className={` absolute ml-[-24px] mt-[12px] w-[1rem]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
            initial={{ scaleX: 0, x: "100%" }}
            animate={this.animateControls.x}
          />
        </motion.div>
      </motion.div>
    );
  }
}
