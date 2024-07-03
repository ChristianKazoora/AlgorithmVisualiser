import { CellDecorator } from "../../cellDecorator";
export class LeftToBottomTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={`mt-[.7rem]  w-[0.5rem] h-[1.2rem]   ${this.classNames}`}>
        <div
          className={` mb-[.9rem] ml-[-1rem] w-[1.5rem]  h-[0.5rem] ${this.classNames}`}
        />
      </div>
    );
  }
}
// LeftToBottomTurn
