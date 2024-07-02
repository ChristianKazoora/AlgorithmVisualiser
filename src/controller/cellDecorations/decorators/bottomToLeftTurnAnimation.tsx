import { CellDecorator } from "../cellDecorator";
export class BottomToLeftTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={`mt-[.7rem]  w-[0.5rem] h-[1.2rem]   ${this.classNames}`}>
        <div
          className={` ml-[-1rem] mb-[.8rem]  w-[1.5rem]  h-[0.5rem] ${this.classNames}`}
        />
      </div>
    );
  }
}
// bottomToLeftTurn
