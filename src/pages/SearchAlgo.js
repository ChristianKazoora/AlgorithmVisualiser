import {
  boxItemsList,
  setBoxItemsList,
  boxSetup,
} from "../components/SearchVisual/Box";
import React, { useState, useEffect } from "react";
import Box from "../components/SearchVisual/Box";
import Binary from "../components/algorithms/Search/BinarySearch";
import Linear from "../components/algorithms/Search/LinearSearch";
import Interpolation from "../components/algorithms/Search/InterpolationSearch";
function SearchAlgo(props) {
  let min = props.min; // set the minimum value
  let max = props.max; // set the maximum value
  let size = props.size; // set the desired size of the array
  const [items, setItems] = useState(
    boxItemsList() || boxSetup(min, max, size)
  ); // create a state variable for items
  const [generator, setGenerator] = useState(null); // create a state for the generator object
  const [pointers, setPointers] = useState([]); // create a state for the indices of the compared elements
  const [closed, setClosed] = useState([]); // create a state for the sorted elements
  const [pivot, setPivot] = useState(null); // create a state for the pivot element
  const [current, setCurrent] = useState(null);
  const [placeholderValue, setPlaceholderValue] = useState(0);
  var currentAlgoState = props.algo;
  var isStart = props.start;
  const [input, setInput] = useState(0);

  useEffect(() => {
    if (isStart) {
      switch (currentAlgoState) {
        case "Binary Search":
          setGenerator(Binary(items, input));
          break;
        case "Linear Search":
          setGenerator(Linear(items, input));
          break;
        case "Interpolation Search":
          setGenerator(Interpolation(items, input));
          break;
        default:
          break;
      }
    }
  }, [isStart, input]); // run this effect only when isStart changes

  useEffect(() => {
    if (generator) {
      const handle = setInterval(() => {
        // create an interval to call next() on the generator object every certain time
        const { value, done } = generator.next(); // get the value and done properties from the returned object by next()
        //  console.log("value.items: " + value.items);
        if (done) {
          clearInterval(handle); // clear the interval when done is true
          setGenerator(null); // reset the generator state to null
          setPointers([]);
          setClosed([]);
        } else {
          setCurrent(value.current);
          setPointers(value.pointers);
          setClosed(value.closed);
          // setClosed((prev) => [...prev, ...value.closed]);
        }
      }, 700); // adjust this time as you wish
      return () => clearInterval(handle); // clear the interval when unmounting or re-rendering
    }
  }, [generator]); // run this effect only when generator changes

  useEffect(() => {
    shuffleItems(items);
    // console.log("in shuffle=>" + items);
  }, [props.isRandom]);

  const handleInputChange = (event) => {
    //input = parseInt(event.target.value);
    setInput(parseInt(event.target.value)); // Convert input to integer or adjust as needed
  };
  const getRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * items.length - 1);
    // setRandomNumberGenerated(true);
    // input = items[randomIndex];
    setInput(items[randomIndex]);
    return items[randomIndex];
  };
  useEffect(() => {
    setPlaceholderValue(getRandomNumber());
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        Enter a value to search:
        <br />
        <input
          type="number"
          placeholder={placeholderValue}
          onChange={handleInputChange}
        />
      </div>
      <div></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        {/* Render bar with different props using map */}
        {items.map((item, index) => (
          <Box
            value={item}
            color={
              index === current
                ? "blue"
                : pointers
                ? pointers.includes(index)
                  ? "red"
                  : closed
                  ? closed.includes(index)
                    ? "black"
                    : "#909090"
                  : "#909090"
                : "#909090"
            }
            width={50}
            height={50}
          />
        ))}
        {/* Render  bar with different props */}
      </div>
    </div>
  );
}

export default SearchAlgo;

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
