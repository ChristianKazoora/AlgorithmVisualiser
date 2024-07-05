import { CellDecorator } from "../../../cellDecorator";

export class WestToSouthEastTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={" flex  justify-center items-center h-full "}>
        <div
          className={` absolute mt-[.0rem]  w-[1rem] mr-[.6rem] h-[0.5rem]  ${this.classNames}`}
        />
        <div
          className={`absolute ml-[.41rem] mt-[.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[225deg]  ${this.classNames} `}
          style={{
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>
      </div>
    );
  }
}
