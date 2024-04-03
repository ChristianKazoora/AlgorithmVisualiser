function* BubbleSort(items) {
  let swapped = false; // declare swapped variable outside inner loop
  let size = items.length;
  do {
    swapped = false; // reset swapped flag before inner loop
    for (let i = 1; i < size; i++) {
      if (items[i - 1] > items[i]) {
        // only swap if left element is greater than right element
        swap(i - 1, i); // call swap function
        swapped = true; // set swapped flag to true
      }
      yield { items: [...items], compare: [i - 1, i], size }; // yield the current state and the indices of the compared elements
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
export default BubbleSort;
