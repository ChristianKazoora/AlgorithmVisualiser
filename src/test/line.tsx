import React from "react";
import { Grid } from "@mui/material";

const Line = () => {
  const classNames: string = "bg-red-500";

  return (
    <div className="flex justify-center items-center gap-3 mt-[10rem]">
      <Grid
        id={`cell-${0}-${0}`}
        item
        xs={0}
        key={0}
        data-row={0}
        data-col={0}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        <div className={" flex justify-center"}>
          <div
            className={`   w-[0.5rem] h-[1.3rem]  rounded-[3.5px] ${classNames}`}
          >
            <div
              className={`  w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${classNames}`}
            />
          </div>
        </div>
      </Grid>
      <Grid
        id={`cell-${0}-${1}`}
        item
        xs={0}
        key={2}
        data-row={0}
        data-col={1}
        className={" flex justify-center items-center"}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        <div
          className={` w-[0.5rem] h-[1.5rem]  rounded-[3.5px] ${classNames}`}
        >
          <div
            className={` w-[15px]  h-[0.5rem] rounded-[3.5px] ${classNames}`}
          />
        </div>
      </Grid>
      <Grid
        id={`cell-${0}-${2}`}
        item
        xs={0}
        key={2}
        data-row={0}
        data-col={2}
        className={" flex justify-center items-center"}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      ></Grid>
      <Grid
        id={`cell-${0}-${3}`}
        item
        xs={0}
        key={3}
        data-row={0}
        data-col={3}
        className={" flex justify-center items-center"}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        {" "}
        <div
          className={`   w-[0.5rem] h-[1.3rem]  rounded-[3.5px] ${classNames}`}
        >
          <div
            className={`  w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${classNames}`}
          />
        </div>
      </Grid>
    </div>
  );
};

export default Line;
