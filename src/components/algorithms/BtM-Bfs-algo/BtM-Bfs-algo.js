function bfs(start, end, walls, row, col) {
  const width = col;
  const height = row;

  function get_neighbors(pos) {
    let neighbors = [];

    if (walls[pos][3] === false) {
      neighbors.push(pos - 1);
    }
    if (walls[pos][1] === false) {
      neighbors.push(pos + 1);
    }
    if (walls[pos][0] === false) {
      neighbors.push(pos - width);
    }
    if (walls[pos][2] === false) {
      neighbors.push(pos + width);
    }
    return neighbors;
  }

  const visited = [];
  let found = false;
  const queue = [];
  const target = end[0] * width + end[1];
  const parent = new Map();
  const startCell = start[0] * width + start[1];
  queue.push(startCell);

  while (found === false && queue.length !== 0) {
    const current = queue.shift();

    if (current === target) {
      found = true;
      visited.push(current);
    } else {
      if (!visited.includes(current)) {
        visited.push(current);
        const neighbors = get_neighbors(current);
        for (let k = 0; k < neighbors.length; k++) {
          if (!visited.includes(neighbors[k])) {
            queue.push(neighbors[k]);
            parent.set(neighbors[k], current);
          }
        }
      }
    }
  }

  const path = [target];
  while (path[path.length - 1] !== startCell) {
    if (parent.has(path[path.length - 1])) {
      path.push(parent.get(path[path.length - 1]));
    } else {
      console.log("Path not found");
      break;
    }
  }
  path.reverse();
  return { path, visited };
}

export default bfs;
