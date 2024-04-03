import Bar from "../components/Bars/Bars";
import {
  barItemsList,
  setBarItemsList,
  barsSetup,
} from "../components/Bars/Bars";
import React, { useState, useEffect } from "react";
import BubbleSort from "../components/algorithms/Sorting/BubbleSort";
import QuickSort from "../components/algorithms/Sorting/QuickSort";
import MergeSort from "../components/algorithms/Sorting/MergeSort";
import HeapSort from "../components/algorithms/Sorting/HeapSort";
function SortAlgo(props) {
  let min = props.min; // set the minimum value
  let max = props.max; // set the maximum value
  let size = props.size; // set the desired size of the array
  const [items, setItems] = useState(
    barItemsList() || barsSetup(min, max, size)
  ); // create a state variable for items
  //console.log("Items=>" + items);
  const [generator, setGenerator] = useState(null); // create a state for the generator object
  const [compare, setCompare] = useState([]); // create a state for the indices of the compared elements
  const [completed, setCompleted] = useState([]); // create a state for the sorted elements
  const [pivot, setPivot] = useState(null); // create a state for the pivot element
  // const isRandom = props.isRandom;
  //let completed = new Set();
  var currentAlgoState = props.algo;
  var isStart = props.start;

  useEffect(() => {
    if (isStart) {
      switch (currentAlgoState) {
        case "Bubble Sort":
          setGenerator(BubbleSort(items)); // initialize the generator object with the bubble sort function
          break;
        case "Quick Sort":
          setGenerator(QuickSort(items, 0, items.length - 1)); //(items);
          break;
        case "Merge Sort":
          let allItems = [...items];
          let midIndex = Math.floor(items.length / 2);

          setGenerator(MergeSort(allItems, items, 0, midIndex)); //(items);
          break;
        case "Heap Sort":
          setGenerator(HeapSort(items));
          break;
        default:
          break;
      }
    }
  }, [isStart]); // run this effect only when isStart changes
  //console.log(items);

  useEffect(() => {
    if (generator) {
      const handle = setInterval(() => {
        // create an interval to call next() on the generator object every certain time
        const { value, done } = generator.next(); // get the value and done properties from the returned object by next()
        //  console.log("value.items: " + value.items);
        if (done) {
          clearInterval(handle); // clear the interval when done is true
          setGenerator(null); // reset the generator state to null
          setCompare([]); // reset the compare state to an empty array
        } else {
          setItems(value.items); // update the items variable with the yielded array
          setCompare(value.compare); // update the compare state with the yielded indices
          // if (!completed.includes(value.pivot)) {

          completed.push(value.size);
          setPivot(value.pivot); // update the pivot state with the value of the pivot element

          if (
            value.compare &&
            value.compare[0] !== undefined &&
            value.compare[0] === value.compare[1]
          ) {
            completed.push(value.compare[0]);
          }

          //} //setCompleted([...completed, value.size]);
        }
      }, 5); // adjust this time as you wish
      return () => clearInterval(handle); // clear the interval when unmounting or re-rendering
    }
  }, [generator]); // run this effect only when generator changes
  // console.log("items: " + items);

  useEffect(() => {
    shuffleItems(items);
    setBarItemsList(items);
    console.log("in shuffle=>" + items);
  }, [props.isRandom]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        height: "87vh", // Adjust the height to center vertically on the screen
      }}
    >
      {/* Render bar with different props using map */}
      {items.map((item, index) => (
        <Bar
          value={item}
          color={
            index === pivot // check if the index is equal to the pivot
              ? "blue" // if yes, use blue color
              : // : completed.includes(index)
              // ? "yellow"
              compare
              ? compare.includes(index)
                ? "red"
                : "#909090"
              : "#909090"
          } // change color based on compare state
          width={50}
          height={`${item * 6.4}px`}
        />
      ))}
      {/* Render  bar with different props */}
    </div>
  );
}

export default SortAlgo;

function shuffleItems(items) {
  //const shuffledItems = [...items]; // Create a shallow copy of the original array

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // Swap elements at i and j
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
}
/*
function SortAlgo(props) {
  let min = 5; // set the minimum value
  let max = 100; // set the maximum value
  let size = 15; // set the desired size of the array
  let items;
  if (barItemsList() !== undefined) {
    items = barItemsList();
  } else {
    items = barsSetup(min, max, size);
  }

  var currentAlgoState = props.algo;
  var isStart = props.start;
  if (isStart) {
    switch (currentAlgoState) {
      // switch statement to render the component based on the option
      case "Bubble Sort":
        return <Bubble items={items} />;
      case "Insertion Sort":
        return;
      case "Merge Sort":
        return;
      default:
        return;
    }
  } else {
    // render a random list
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        margin: "auto",
      }}
    >
      {/* Render bar with different props using map /}
      {items.map((item) => (
        <Bar
          value={item}
          color="#909090"
          width={50}
          height={`${item / 3}rem`}
        />
      ))}
      {/* Render  bar with different props /}
    </div>
  );
}

export default SortAlgo;
*/
