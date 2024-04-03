import classes from "./Bars.module.css";
function Bar(props) {
  return (
    <svg width={props.width} height={props.height} className={classes.bar}>
      {/* Render a background rectangle with a light gray color */}
      <rect
        x="0"
        y="0"
        width={props.width}
        height={props.height}
        fill="#f0f0f0"
      />
      {/* Render a foreground rectangle with the given color and dynamic width */}
      <rect
        x="0"
        y="0"
        width={props.width}
        height={props.height}
        fill={props.color}
      />
      {/* Render a text element with the value and percentage */}
      <text
        x="50%" //{`${props.width - 5}`}
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {/* {props.value} */}
      </text>
    </svg>
  );
}

export default Bar;
let items;
export function barsSetup(min, max, size) {
  items = []; // create an empty array
  //let input = 2;
  // loop until the array is full
  while (items.length < size) {
    // generate a random integer between min and max
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    // push it into the array
    items.push(random);
    //items.push(size - input);
    //input++;
  }
  return items;
}
export function barItemsList() {
  console.log("Get Items=>" + items);
  return items;
}
export function setBarItemsList(barItemsList) {
  items = barItemsList;
  console.log("setBarItemsList=>" + items);
}
