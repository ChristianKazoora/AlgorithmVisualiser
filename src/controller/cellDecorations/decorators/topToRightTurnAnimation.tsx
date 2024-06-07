import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid, touchRippleClasses } from "@mui/material";
export class TopToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`  w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
        >
          <div
            className={` w-[2rem]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
          ></div>
        </div>
      </div>
    );
  }
}
