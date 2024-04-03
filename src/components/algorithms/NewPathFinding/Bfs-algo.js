import { connect, bfss, disconnect } from "../../../socket/AlgoPosition";
function* bfs(theStart, end, walls, row, col) {
  const length = row;
  const width = col;
  const visited = new Set(walls);
  var found = false;
  var queue = [];
  var target = end[0] * width + end[1];
  var parent = new Map();
  var start = theStart[0] * width + theStart[1];
  // connect();
  queue.push(start);
  function get_neighbors(pos) {
    let neighbors = [];
    if (pos % width !== 0 && !visited.has(pos - 1)) {
      neighbors.push(pos - 1);
    }
    if (pos % width !== width - 1 && !visited.has(pos + 1)) {
      neighbors.push(pos + 1);
    }
    if (pos >= width && !visited.has(pos - width)) {
      neighbors.push(pos - width);
    }
    if (pos < length * width - width && !visited.has(pos + width)) {
      neighbors.push(pos + width);
    }
    return neighbors;
  }

  while (found === false && queue.length !== 0) {
    var current = queue[0];
    queue.splice(queue.indexOf(current), 1);
    if (current === target) {
      found = true;
      visited.add(current);
    } else {
      if (!visited.has(current)) {
        visited.add(current);
        //find neighbours at current
        var neighbors = get_neighbors(current);
        for (let k = 0; k < neighbors.length; k++) {
          if (!visited.has(neighbors[k])) {
            queue.push(neighbors[k]);
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
      path: [...path], // Make sure to yield a copy of the path array
      visited: [...visited], // Similarly, yield copies of other arrays
      current: current,
    };

    //
    // bfss("null", "null", "null", "null", "null");
  }
  let path = [target];
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
  };
  //bfss(null, null, null, null, null);
  //disconnect();
  return;
}

export default bfs;
