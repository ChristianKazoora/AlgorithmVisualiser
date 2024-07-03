import { CellDecorator } from "../../cellDecorator";
import { TurnHelper } from "../../../pathfindingCellStates/turnHelper";

export class up_Down extends CellDecorator {
  animate(): any {
    if (TurnHelper.topToBottom(this)) {
      return <div className={`  w-[0.5rem] h-[1.9rem] ${this.classNames} `} />;
    } else if (TurnHelper.bottomToTop(this)) {
      return (
        <div
          className={` w-[0.5rem] h-[1.4rem] ${this.classNames} `}
          // initial={{ scaleY: 0, y: "100%" }} // initial state
        />
      );
    }
  }
}
