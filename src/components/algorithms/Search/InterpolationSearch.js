function* interpolationSearch(arr, target) {
  yield* BubbleSort(arr);
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) {
        yield {
          current: low,
        };
        return;
      }
      yield {
        current: null,
        pointers: [low, high],
      };
      return; // Element not found
    }

    // Estimate the position of the target using interpolation formula
    let pos =
      low +
      Math.floor(((target - arr[low]) / (arr[high] - arr[low])) * (high - low));

    if (arr[pos] === target) {
      yield {
        current: pos,
        pointers: [low, high],
      };
      return pos;
    }

    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
    yield {
      current: pos,
      pointers: [low, high],
    };
  }

  yield {
    current: null,
    pointers: [low, high],
  };
  return -1; // Element not found
}

export default interpolationSearch;

function* BubbleSort(items) {
  let swapped = false;
  let size = items.length;

  do {
    swapped = false;
    for (let i = 1; i < size; i++) {
      if (items[i - 1] > items[i]) {
        swap(i - 1, i);
        swapped = true;
      }
      //   yield {
      //     pointers: [i, i - 1],
      //   };
    }
    size--;
  } while (swapped);

  return items;

  function swap(iMinusOne, i) {
    let temp = items[iMinusOne];
    items[iMinusOne] = items[i];
    items[i] = temp;
  }
}
