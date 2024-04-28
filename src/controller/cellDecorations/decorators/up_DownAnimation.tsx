import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { TurnHelper } from "../../pathfindingCellStates/turnHelper";

export class up_Down extends CellDecorator {
  animate(): any {
    if (TurnHelper.topToBottom(this)) {
      return (
        <motion.div
          animate={this.animateControls.y}
          className={` mt-[0rem] w-[0.5rem] h-[1.75rem] ${this.classNames} `}
          initial={{ scaleY: 0, y: "-100%" }} // initial state
        />
      );
    } else if (TurnHelper.bottomToTop(this)) {
      return (
        <motion.div
          animate={this.animateControls.y}
          className={`mb-[0rem] w-[0.5rem]   h-[2rem] ${this.classNames} `}
          initial={{ scaleY: 0, y: "100%" }} // initial state
        />
      );
    } else {
      return "";
    }
  }
}
