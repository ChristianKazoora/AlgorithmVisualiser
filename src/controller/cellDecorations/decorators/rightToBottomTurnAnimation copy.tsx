import { CellDecorator } from "../cellDecorator";
export class RightToBottomTurn extends CellDecorator {
  animate(): any {
    return (
      <div
        className={`  w-[0.5rem] h-[1.5rem]  rounded-[3.5px] ${this.classNames}`}
      >
        <div
          className={`  w-[1.5rem] h-[0.5rem] rounded-[3.5px] ${this.classNames}`}
        />
      </div>
    );
  }
}
