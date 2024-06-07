import { TurnHelper } from "../../pathfindingCellStates/turnHelper";
import { CellDecorator } from "../cellDecorator";
import { Left_Right } from "../decorators/left_RightAnimation";
import { TopToRightTurn } from "../decorators/topToRightTurnAnimation";
import { LeftToTopTurn } from "../decorators/leftToTopTurnAnimation";
import { BottomToRightTurn } from "../decorators/bottomToRightTurnAnimation";
import { LeftToBottomTurn } from "../decorators/leftToBottomTurnAnimation";
import { RightToBottomTurn } from "../decorators/rightToBottomTurnAnimation";
import { RightToTopTurn } from "../decorators/rightToTopTurnAnimation";
import { TopToLeftTurn } from "../decorators/topToLeftTurnAnimation";
import { BottomToLeftTurn } from "../decorators/bottomToLeftTurnAnimation";
import { up_Down } from "../decorators/up_DownAnimation";
export class Line extends CellDecorator {
  animate(): any {
    {
      return (() => {
        let pos: JSX.Element | undefined;
        this.classNames = "absolute bg-green-500";
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
        return <div>{pos}</div>;
      })();
    }
  }
}
