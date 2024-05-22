import { Grid } from "@mui/material";
import { CellDecorator } from "../cellDecorator";
import { Line } from "./line";
export class MainPath extends CellDecorator {
  animate(): any {
    // this.classNames = " bg-red-500";
    return new Line(this).animate();
    // <div className=" bg-green-300 h-[1.1rem] " />
  }
}
