import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid, touchRippleClasses } from "@mui/material";
export class TopToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <div>
        <div
          className={` ml-[5px] mt-[-3px] w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
        >
          <div
            className={`mt-[8px] w-[1rem]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
          ></div>
        </div>
      </div>
    );
  }
}
