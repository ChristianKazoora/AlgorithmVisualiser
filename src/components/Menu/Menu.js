import classes from "./Menu.module.css";
import React, { useState } from "react";
import HomePage from "../../pages/HomePage";
import PathFinding from "../../pages/NewPathFindAlgo";
import SearchAlgo from "../../pages/SearchAlgo";
import SortAlgo from "../../pages/SortAlgo";
//import sockets from "../../sockets";
function Menu(props) {
  const [option, setOption] = useState("Home Page"); // state variable for the current page option

  const [currentAlgo, setAlgo] = useState("Select..."); // state Algorithm for the current Algorithm option

  const [isAuto, setIsAuto] = useState(true);

  const [toStart, setToStart] = useState(false);

  const [isRandom, setRandom] = useState(false);

  const [isCleard, setIsCleard] = useState(false);
  //sockets;
  const row = 30; //31;
  const col = 50; //60;
  const start = [10, 10];
  const end = [row - 1, col - 1];
  const min = 3; // set the minimum value
  const max = 115; // set the maximum value
  const size = 100; // set the desired size of the array
  const searchMin = 0;
  const searchMax = 100;
  const searchSize = 28;
  var Page = () => {
    switch (option) {
      // switch statement to render the component based on the option
      case "Home Page":
        return <HomePage />;
      case "Path Finding":
        return (
          <PathFinding
            start={toStart}
            algo={currentAlgo}
            state={isAuto}
            random={isRandom}
            startPoint={start}
            endPoint={end}
            col={col}
            row={row}
            isCleard={isCleard}
          />
        );
      case "Search":
        return (
          <SearchAlgo
            start={toStart}
            algo={currentAlgo}
            isRandom={isRandom}
            min={searchMin}
            max={searchMax}
            size={searchSize}
          />
        );
      case "Sort":
        return (
          <SortAlgo
            start={toStart}
            algo={currentAlgo}
            isRandom={isRandom}
            min={min}
            max={max}
            size={size}
          />
        );
      default:
        return null;
    }
  };

  // Wrap your elements in a fragment or a div
  return (
    <>
      <section className={classes.strip}>
        <select
          className={classes.tittleDropdown}
          value={option} // set the value of the select element to the state variable
          onChange={(e) => {
            setToStart(false);
            setOption(e.target.value);
          }} // update the state variable when the option changes
        >
          <option>Home Page</option>
          <option>Path Finding</option>
          <option>Search</option>
          <option>Sort</option>
        </select>

        {option === "Path Finding" && (
          <select
            className={classes.select}
            value={currentAlgo} // set the value of the select element to the state variable
            onChange={(e) => {
              setAlgo(e.target.value);
              setIsCleard(false);
              setToStart(false);
            }} // update the state variable when the option changes
          >
            <option>Select...</option>
            <option>A*</option>
            <option>BFS</option>
            <option>DFS</option>
          </select>
        )}

        {option === "Search" && (
          <select
            className={classes.select}
            value={currentAlgo} // set the value of the select element to the state variable
            onChange={(e) => {
              setAlgo(e.target.value);
              // setRandom(false);

              setToStart(false);
            }} // update the state variable when the option changes
          >
            <option>Select...</option>
            <option>Binary Search</option>
            <option>Linear Search</option>
            <option>Interpolation Search</option>
          </select>
        )}

        {option === "Sort" && (
          <select
            className={classes.select}
            value={currentAlgo} // set the value of the select element to the state variable
            onChange={(e) => {
              setAlgo(e.target.value);
              setToStart(false);
              // setRandom(false);
              setIsAuto(true);
            }} // update the state variable when the option changes
          >
            <option>Select...</option>
            <option>Bubble Sort</option>
            <option>Quick Sort</option>
            <option>Merge Sort</option>
            <option>Heap Sort</option>
          </select>
        )}

        <ul>
          {option !== "Home Page" && (
            <button
              className={classes.button}
              onClick={() => {
                setToStart(true);
                // setRandom(false);
                setIsCleard(false);
              }}
            >
              Start
            </button>
          )}
          {option !== "Sort" &&
            option !== "Home Page" &&
            option !== "Search" && (
              <button
                className={classes.button}
                onClick={() => {
                  setToStart(false);
                  setIsCleard(true);
                  // setRandom(false);
                }}
              >
                Clear
              </button>
            )}
          {option !== "Home Page" && (
            <button
              className={classes.random}
              onClick={() => {
                setToStart(false);
                setRandom((prevIsAuto) => !prevIsAuto);
                setIsCleard(false);
              }}
            >
              Random
            </button>
          )}
        </ul>
        {option !== "Sort" && option !== "Home Page" && option !== "Search" && (
          <button
            className={classes.button}
            onClick={() => {
              setToStart(false);
              setRandom(false);
              setIsAuto((prevIsAuto) => !prevIsAuto); // this will flip the boolean value
            }}
          >
            State
          </button>
        )}
      </section>
      <div>{Page()}</div>
    </>
  );
}

export default Menu;
