function* BinarySearch(items, input) {
  yield* BubbleSort(items);
  let left = 0;
  let right = items.length - 1;
  let closed = [];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (items[mid] === input) {
      yield {
        current: mid,
        pointers: [left, right],
        closed: closed,
      };
      return; // Found the input
    } else if (items[mid] < input) {
      left = mid + 1; // input is in the right half
    } else {
      right = mid - 1; // input is in the left half
    }

    yield {
      current: mid,
      pointers: [left, right],
      closed: closed,
    };
    closed = []; // Reset the closed array
    for (let i = 0; i < left + 1; i++) {
      // Push all the indices from 0 to left - 1
      closed.push(i);
    }
    for (let i = right; i < items.length; i++) {
      // Push all the indices from right + 1 to items.length - 1
      closed.push(i);
    }
  }

  return -1; // input not found
}
export default BinarySearch;

function* BubbleSort(items) {
  let swapped = false; // declare swapped variable outside inner loop
  let size = items.length;
  let ponter1 = 0;
  let pointer2 = 0;
  do {
    swapped = false; // reset swapped flag before inner loop
    for (let i = 1; i < size; i++) {
      if (items[i - 1] > items[i]) {
        // only swap if left element is greater than right element
        ponter1 = i;
        pointer2 = i - 1;
        swap(i - 1, i); // call swap function
        swapped = true; // set swapped flag to true
      }
      ponter1 = i;
      if (i - 1 !== -1) {
        pointer2 = i - 1;
      }

      //   yield {
      //     pointers: [ponter1, pointer2],
      //   };
    }
    size--;
  } while (swapped); // repeat until no swaps
  return items; // return sorted array

  function swap(iMinusOne, i) {
    // declare swap function outside bubbleSort
    let temp = items[iMinusOne]; // use a temporary variable to store value
    items[iMinusOne] = items[i]; // assign value from right element to left element
    items[i] = temp; // assign value from temporary variable to right element
  }
}
