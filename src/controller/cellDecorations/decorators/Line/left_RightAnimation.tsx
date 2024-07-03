import { CellDecorator } from "../../cellDecorator";
import { TurnHelper } from "../../../pathfindingCellStates/turnHelper";
export class Left_Right extends CellDecorator {
  animate(): any {
    return (
      //if cell is going left to right align, if cell is going from right to left align to right
      TurnHelper.leftToRight(this) ? (
        <div className={`  w-[1.6rem] h-[0.5rem] ${this.classNames} `} />
      ) : TurnHelper.rightToLeft(this) ? (
        <div
          className={`  w-[1.6rem] h-[0.5rem] ${this.classNames} `}
          //   transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        />
      ) : (
        ""
      )
    );
  }
}
