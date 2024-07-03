import { TurnHelper } from "../../pathfindingCellStates/turnHelper";
import { CellDecorator } from "../cellDecorator";
import { Left_Right } from "../decorators/Line/left_RightAnimation";
import { TopToRightTurn } from "../decorators/turns/topToRightTurnAnimation";
import { LeftToTopTurn } from "../decorators/turns/leftToTopTurnAnimation";
import { BottomToRightTurn } from "../decorators/turns/bottomToRightTurnAnimation";
import { LeftToBottomTurn } from "../decorators/turns/leftToBottomTurnAnimation";
import { RightToBottomTurn } from "../decorators/turns/rightToBottomTurnAnimation";
import { RightToTopTurn } from "../decorators/turns/rightToTopTurnAnimation";
import { TopToLeftTurn } from "../decorators/turns/topToLeftTurnAnimation";
import { BottomToLeftTurn } from "../decorators/turns/bottomToLeftTurnAnimation";
import { up_Down } from "../decorators/Line/up_DownAnimation";
import { cornerToCorner } from "../decorators/cornerToCorner/cornerToCorner";
export class Line extends CellDecorator {
  animate(): any {
    {
      return (() => {
        let pos: JSX.Element | undefined;
        this.classNames = " rounded-box bg-green-500";
        if (TurnHelper.left_Right(this)) {
          pos = new Left_Right(this).animate();
        } else if (TurnHelper.up_Down(this)) {
          pos = new up_Down(this).animate();
        }
        //turns
        else if (TurnHelper.topToRightTurn(this)) {
          pos = new TopToRightTurn(this).animate();
        } else if (TurnHelper.leftToTopTurn(this)) {
          pos = new LeftToTopTurn(this).animate();
        } else if (TurnHelper.bottomToRightTurn(this)) {
          pos = new BottomToRightTurn(this).animate();
        } else if (TurnHelper.leftToBottomTurn(this)) {
          pos = new LeftToBottomTurn(this).animate();
        }

        //inverse turns
        else if (TurnHelper.rightToBottomTurn(this)) {
          pos = new RightToBottomTurn(this).animate();
        } else if (TurnHelper.bottomToLeftTurn(this)) {
          pos = new BottomToLeftTurn(this).animate();
        } else if (TurnHelper.topToLeftTurn(this)) {
          pos = new TopToLeftTurn(this).animate();
        } else if (TurnHelper.rightToTopTurn(this)) {
          pos = new RightToTopTurn(this).animate();
        }

        // cornerToCorner
        else if (TurnHelper.northEastToSouthWest(this)) {
          console.log("northEastToSouthWest");
          pos = new cornerToCorner(this).animate();
        } else if (TurnHelper.northWestToSounthEast(this)) {
          console.log("northWestToSounthEast");
          pos = new cornerToCorner(this).animate();
        }

        return <div className="flex  justify-center items-center">{pos}</div>;
      })();
    }
  }
}
