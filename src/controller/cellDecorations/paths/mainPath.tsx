import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { Line } from "./line";
export class MainPath extends CellDecorator {
  animate(): any {
    this.classNames = " bg-red-500";
    return (
      //   {new Line(this, this.animateControls).animate()}
      <div className=" bg-black h-[1.2rem] " />
    );
  }
}
