function* quickSort(items, lowIndex, highIndex) {
  if (lowIndex >= highIndex) {
    return;
  }
  let pivotIndex = Math.floor(
    Math.random() * (highIndex - lowIndex) + lowIndex
  );
  swap(items, pivotIndex, highIndex);

  let pivot = items[highIndex];
  let leftPointer = lowIndex;
  let rightPointer = highIndex;

  yield {
    items: [...items],
    compare: [pivotIndex, highIndex],
    pivot: highIndex,
  }; // return the current state of the array

  while (leftPointer < rightPointer) {
    while (items[leftPointer] <= pivot && leftPointer < rightPointer) {
      leftPointer++;
      yield {
        items: [...items],
        compare: [leftPointer, rightPointer],
        pivot: highIndex,
      }; // return the current state of the array
    }

    while (items[rightPointer] >= pivot && rightPointer > leftPointer) {
      rightPointer--;
      yield {
        items: [...items],
        compare: [leftPointer, rightPointer],
        pivot: highIndex,
      }; // return the current state of the array
    }

    swap(items, leftPointer, rightPointer);
    yield {
      items: [...items],
      compare: [leftPointer, rightPointer],
      pivot: highIndex,
    }; // return the current state of the array
  }
  swap(items, leftPointer, highIndex);
  yield {
    items: [...items],
    compare: [leftPointer, highIndex],
    pivot: highIndex,
  };
  yield* quickSort(items, lowIndex, leftPointer - 1);
  yield* quickSort(items, leftPointer + 1, highIndex);
  return items;
}
function swap(items, index1, index2) {
  let temp = items[index1];
  items[index1] = items[index2];
  items[index2] = temp;
}

export default quickSort;
