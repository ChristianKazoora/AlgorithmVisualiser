import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { TurnHelper } from "../../pathfindingCellStates/turnHelper";

export class up_Down extends CellDecorator {
  animate(): any {
    if (TurnHelper.topToBottom(this)) {
      return (
        <div
          className={` ml-[0.3rem]  w-[0.5rem] h-[1.3rem] ${this.classNames} `}
          // initial={{ scaleY: 0, y: "-100%" }} // initial state
        />
      );
    } else if (TurnHelper.bottomToTop(this)) {
      return (
        <div
          className={` ml-[0.3rem] w-[0.5rem] h-[1.3rem] ${this.classNames} `}
          // initial={{ scaleY: 0, y: "100%" }} // initial state
        />
      );
    }
  }
}
