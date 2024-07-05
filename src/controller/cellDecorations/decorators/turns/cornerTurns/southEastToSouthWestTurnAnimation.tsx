// SouthEastToSouthWestTurn;
import { CellDecorator } from "../../../cellDecorator";

export class SouthEastToSouthWestTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={" flex  justify-center items-center h-full "}>
        <div
          className={`absolute mr-[.42rem]  mb-[-.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[-45deg]  ${this.classNames} `}
          style={{
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
          }}
        />
        <div
          className={`absolute  ml-[.42rem] mb-[-.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[225deg]  ${this.classNames} `}
          style={{
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
          }}
        />
      </div>
    );
  }
}
