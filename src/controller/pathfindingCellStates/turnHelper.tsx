import { Cell } from "../../model/subject/Cell";

export class TurnHelper {
  static leftToRight(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  static rightToLeft(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }
  static topToBottom(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static bottomToTop(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.top && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static left_Right(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.right && cell.previousCell == cell.left) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.right)
      ) {
        return true;
      }
    }
    return result;
  }
  static up_Down(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.top && cell.previousCell == cell.bottom) ||
        (cell.nextCell == cell.bottom && cell.previousCell == cell.top)
      ) {
        return true;
      }
    }
    return result;
  }
  static topToRightTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static bottomToRightTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static leftToBottomTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  static rightToBottomTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }
  static bottomToLeftTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static leftToTopTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      console.log();
      if (cell.nextCell == cell.top && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  static topToLeftTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static rightToTopTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.top && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }

  static bottomToNorthEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.topRight && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static topToSouthEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottomRight && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static bottomToNorthWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.topLeft && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static topToSouthWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottomLeft && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static topApexTurnToRight(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        cell.nextCell == cell.bottomRight &&
        cell.previousCell == cell.bottomLeft
      ) {
        result = true;
      }
    }
    return result;
  }
  static bottomApexTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topRight && cell.previousCell == cell.topLeft) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.right)
      ) {
        result = true;
      }
    }
    return result;
  }
}
