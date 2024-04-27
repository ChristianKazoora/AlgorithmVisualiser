import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { TurnHelper } from "../../pathfindingCellStates/turnHelper";

export class up_Down extends CellDecorator {
  animate(): any {
    return (
      //if from up to down align to top, if from down to up align to bottom
      TurnHelper.topToBottom(this) ? (
        <motion.div
          animate={this.animateControls.y}
          className=" mt-[2.35rem] bg-black w-[0.5rem] h-[1.2rem]"
          initial={{ scaleY: 0, y: "-100%" }} // initial state
        />
      ) : (
        <motion.div
          animate={this.animateControls.y}
          className="mb-[2.35rem] w-[0.5rem] relative bg-black  h-[1.2rem]"
          initial={{ scaleY: 0, y: "100%" }} // initial state
        />
      )
    );
  }
}
