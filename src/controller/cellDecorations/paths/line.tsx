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
import { CornerToCorner } from "../decorators/Line/cornerToCorner/cornerToCorner";
import { EastToSouthWestTurn } from "../decorators/turns/cornerTurns/eastToSouthWestTurnAnimation";
import { EastToNorthWestTurn } from "../decorators/turns/cornerTurns/eastToNorthWestTurnAnimation";
import { WestToSouthEastTurn } from "../decorators/turns/cornerTurns/westToSouthEastTurnAnimation";
import { WestToNorthEastTurn } from "../decorators/turns/cornerTurns/westToNorthEastTurnAnimation";
import { NorthToSouthEastTurn } from "../decorators/turns/cornerTurns/northToSouthEastTurnAnimation";
import { NorthToSouthWestTurn } from "../decorators/turns/cornerTurns/northToSouthWestTurnAnimation";
import { SouthToNorthEastTurn } from "../decorators/turns/cornerTurns/southToNorthEastTurnAnimation";
import { SouthToNorthWestTurn } from "../decorators/turns/cornerTurns/southToNorthWestTurnAnimation";
import { NorthEastToNorthWestTurn } from "../decorators/turns/cornerTurns/northEastToNorthWestTurnAnimation";
import { NorthEastToSouthEastTurn } from "../decorators/turns/cornerTurns/northEastToSouthEastTurnAnimation";
import { NorthWestToSouthWestTurn } from "../decorators/turns/cornerTurns/northWestToSouthWestTurnAnimation";
import { SouthEastToSouthWestTurn } from "../decorators/turns/cornerTurns/southEastToSouthWestTurnAnimation";
export class Line extends CellDecorator {
  animate(): any {
    {
      return (() => {
        let pos: JSX.Element | undefined;
        this.classNames = " rounded-box bg-red-500";
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

        // corner To Corner line
        else if (TurnHelper.northEastToSouthWest(this)) {
          pos = new CornerToCorner(this).animate();
        } else if (TurnHelper.northWestToSouthEast(this)) {
          pos = new CornerToCorner(this).animate();
        }

        // corner turns
        //horizontal
        else if (TurnHelper.eastToSouthWest(this)) {
          pos = new EastToSouthWestTurn(this).animate();
        } else if (TurnHelper.eastToNorthWest(this)) {
          pos = new EastToNorthWestTurn(this).animate();
        } else if (TurnHelper.westToSouthEast(this)) {
          pos = new WestToSouthEastTurn(this).animate();
        } else if (TurnHelper.westToNorthEast(this)) {
          pos = new WestToNorthEastTurn(this).animate();
        }

        // corner turns
        //vertical
        else if (TurnHelper.northToSouthEast(this)) {
          pos = new NorthToSouthEastTurn(this).animate();
        } else if (TurnHelper.northToSouthWest(this)) {
          pos = new NorthToSouthWestTurn(this).animate();
        } else if (TurnHelper.southToNorthEast(this)) {
          pos = new SouthToNorthEastTurn(this).animate();
        } else if (TurnHelper.southToNorthWest(this)) {
          pos = new SouthToNorthWestTurn(this).animate();
        }

        // corner to corner turns
        else if (TurnHelper.northEastToNorthWest(this)) {
          pos = new NorthEastToNorthWestTurn(this).animate();
        } else if (TurnHelper.northEastToSouthEast(this)) {
          pos = new NorthEastToSouthEastTurn(this).animate();
        } else if (TurnHelper.northWestToSouthWest(this)) {
          pos = new NorthWestToSouthWestTurn(this).animate();
        } else if (TurnHelper.southEastToSouthWest(this)) {
          pos = new SouthEastToSouthWestTurn(this).animate();
        }
        return <div className="flex  justify-center items-center">{pos}</div>;
      })();
    }
  }
}
// NorthEastToNorthWestTurn;
// NorthEastToSouthEastTurn;
// NorthWestToSouthWestTurn;
// SouthEastToSouthWestTurn;

// northEastToNorthWestTurnAnimation;
// northEastToSouthEastTurnAnimation;
// northWestToSouthWestTurnAnimation;
// southEastToSouthWestTurnAnimation;

// East to SouthWest
// East to NorthWest
// West to SouthEast
// West to NorthEast
// North to SouthEast
// North to SouthWest
// South to NorthEast
// South to NorthWest

// NorthEast to NorthWest || NorthWest to NorthEast
// NorthEast to SouthEast || SouthEast to NorthEast
// NorthWest to SouthWest || SouthWest to NorthWest
// SouthEast to SouthWest || SouthWest to SouthEast
