import { CellDecorator } from "../../../cellDecorator";

export class SouthToNorthEastTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={" flex  justify-center items-center h-full "}>
        <div
          className={` absolute mt-[.57rem] transform rotate-90   w-[1rem] h-[0.5rem]  ${this.classNames}`}
        />
        <div
          className={`absolute ml-[.41rem] mt-[-.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[135deg]  ${this.classNames} `}
          style={{
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>
      </div>
    );
  }
}
