import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { TurnHelper } from "../../pathfindingCellStates/turnHelper";
export class Left_Right extends CellDecorator {
  animate(): any {
    return (
      //if cell is going left to right align, if cell is going from right to left align to right
      TurnHelper.leftToRight(this) ? (
        <motion.div
          className={`ml-[20px] mt-[5px] w-[1.5rem] h-[0.5rem] ${this.classNames} `}
          initial={{ scaleX: 0, x: "-100%" }} // initial state
          animate={this.animateControls.x} // animate to this state
          //   transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        />
      ) : TurnHelper.rightToLeft(this) ? (
        <motion.div
          className={` ml-[-27px] mt-[5px] w-[1.5rem] h-[0.5rem] ${this.classNames} `}
          initial={{ scaleX: 0, x: "100%" }} // initial state
          animate={this.animateControls.x} // animate to this state
          //   transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        />
      ) : (
        ""
      )
    );
  }
}
