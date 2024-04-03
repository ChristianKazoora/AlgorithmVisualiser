function* dfs(theStart, end, walls, row, col) {
  function get_neighbors(pos) {
    let neighbors = [];
    //Top
    if (pos >= width) {
      let gridPos = pos - width;
      if (!visited.has(gridPos)) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(gridPos);
      }
    }

    //Right
    if (pos % width !== width - 1) {
      let gridPos = pos + 1;
      // Check if the neighbor is not in the closedList (not visited yet)
      if (!visited.has(gridPos)) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(gridPos);
      }
    }

    //Bottom
    if (pos < length * width - width) {
      let gridPos = pos + width;
      if (!visited.has(gridPos)) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(gridPos);
      }
    }
    //Left
    if (pos % width !== 0) {
      let gridPos = pos - 1;
      if (!visited.has(gridPos)) {
        // If the neighbor is not in the closedList, add it to the neighbors array
        neighbors.push(gridPos);
      }
    }
    return neighbors;
  }
  const length = row;
  const width = col;
  const visited = new Set(walls);
  var found = false;
  var stack = []; // use a stack instead of a queue
  var target = end[0] * width + end[1];
  var parent = new Map();
  var start = theStart[0] * width + theStart[1];
  stack.push(start); // use push instead of unshift

  while (found === false && stack.length !== 0) {
    var current = stack.pop(); // use pop instead of shift
    if (current === target) {
      found = true;
      break; // Exit the loop when target is found
    } else {
      if (!visited.has(current)) {
        visited.add(current);
        //find neighbors at current
        var neighbors = get_neighbors(current);
        for (let k = 0; k < neighbors.length; k++) {
          if (!visited.has(neighbors[k])) {
            stack.push(neighbors[k]); // use push instead of unshift
            parent.set(neighbors[k], current);
          }
        }
      }
    }
    let path = [current];
    while (path[path.length - 1] !== start) {
      if (parent.has(path[path.length - 1])) {
        path.push(parent.get(path[path.length - 1]));
      } else {
        console.log("Path not found");
        break;
      }
    }
    path.reverse();
    yield {
      path: [...path],
      visited: [...visited], // Similarly, yield copies of other arrays
      current: current,
    };
  }

  if (found) {
  } else {
    console.log("Path not found");
    yield {
      path: [],
    };
  }
}

export default dfs;
