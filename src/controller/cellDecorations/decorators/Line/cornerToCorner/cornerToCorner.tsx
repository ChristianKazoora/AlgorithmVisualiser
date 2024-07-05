import { CellDecorator } from "../../../cellDecorator";
import { TurnHelper } from "../../../../pathfindingCellStates/turnHelper";

export class CornerToCorner extends CellDecorator {
  animate(): any {
    return (
      // north east to south west
      TurnHelper.northEastToSouthWest(this) ? (
        <div
          className={`w-[1.6rem] h-[0.5rem] transform -rotate-45 ${this.classNames}`}
          style={{
            clipPath:
              "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      ) : // north west to south east

      TurnHelper.northWestToSouthEast(this) ? (
        <div
          className={`w-[1.6rem] h-[0.5rem] transform rotate-45 ${this.classNames}`}
          style={{
            clipPath:
              "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      ) : (
        ""
      )
    );
  }
}
