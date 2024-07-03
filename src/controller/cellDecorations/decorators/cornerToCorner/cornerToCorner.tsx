import { CellDecorator } from "../../cellDecorator";
import { TurnHelper } from "../../../pathfindingCellStates/turnHelper";

export class cornerToCorner extends CellDecorator {
  animate(): any {
    return (
      // north east to south west
      TurnHelper.northEastToSouthWest(this) ? (
        <div className={`  w-[1.6rem] h-[0.5rem] ${this.classNames} `} />
      ) : // north west to south east

      TurnHelper.northWestToSounthEast(this) ? (
        <div className={`  w-[1.6rem] h-[0.5rem] ${this.classNames} `} />
      ) : (
        ""
      )
    );
  }
}
