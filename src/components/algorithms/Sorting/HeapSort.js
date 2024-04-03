function* heapSort(items) {
  let count = items.length;
  yield* heapify(items, count);

  let end = count - 1;
  while (end > 0) {
    theSwap(items, end, 0);
    yield {
      items: [...items],
      pivot: end,
      compare: [end],
    }; // return the current state of the array
    end--;
    yield* siftDown(items, 0, end);
    yield {
      items: [...items],
    }; // return the current state of the array
  }
  return items; // return the final sorted array
}
function* heapify(items, count) {
  let start = Math.floor((count - 1) / 2);
  while (start >= 0) {
    yield* siftDown(items, start, count - 1);
    start--;
  }
  yield {
    items: [...items],
    pivot: start,
  }; // return the current state of the array
}
function* siftDown(items, start, end) {
  let root = start;
  while (leftChild(root) <= end) {
    let child = leftChild(root);
    let swap = root;
    if (items[swap] < items[child]) {
      swap = child;
    }
    if (child + 1 <= end && items[swap] < items[child + 1]) {
      swap = child + 1;
    }
    if (swap == root) {
      return;
    } else {
      theSwap(items, root, swap);
      root = swap;
    }
    yield {
      items: [...items],
      pivot: root,
      compare: [start, end],
    }; // return the current state of the array
  }
}
function leftChild(root) {
  return 2 * root + 1;
}

function theSwap(items, index1, index2) {
  let temp = items[index1];
  items[index1] = items[index2];
  items[index2] = temp;
}
export default heapSort;

// function heapSort(items) {
//   let count = items.length;
//   heapify(items, count);
//   let end = count - 1;
//   while (end > 0) {
//     theSwap(items, end, 0);
//     end--;
//     siftDown(items, 0, end);
//   }
// }
// function heapify(items, count) {
//   let start = Math.floor((count - 1) / 2);
//   while (start >= 0) {
//     siftDown(items, start, count - 1);
//     start--;
//   }
// }
// function siftDown(items, start, end) {
//   let root = start;
//   while (leftChild(root) <= end) {
//     let child = leftChild(root);
//     let swap = root;
//     if (items[swap] < items[child]) {
//       swap = child;
//     }
//     if (child + 1 <= end && items[swap] < items[child + 1]) {
//       swap = child + 1;
//     }
//     if (swap == root) {
//       return;
//     } else {
//       theSwap(items, root, swap);
//       root = swap;
//     }
//   }
// }
// function leftChild(root) {
//   return 2 * root + 1;
// }

// function theSwap(items, index1, index2) {
//   let temp = items[index1];
//   items[index1] = items[index2];
//   items[index2] = temp;
// }
// export default heapSort;
