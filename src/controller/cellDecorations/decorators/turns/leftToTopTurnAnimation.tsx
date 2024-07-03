import { CellDecorator } from "../../cellDecorator";
export class LeftToTopTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={`mb-[.9rem]  w-[0.5rem] h-[1.2rem]   ${this.classNames}`}>
        <div
          className={` mt-[.8rem] ml-[-1rem] w-[1.5rem]  h-[0.5rem] ${this.classNames}`}
        />
      </div>
    );
  }
}
