function* MergeSort(fullItems, items, l = 0, r = 0) {
  let itemsLength = items.length;
  if (itemsLength < 2) {
    return;
  }

  let midIndex = Math.floor(itemsLength / 2);
  let leftHalf = items.slice(0, midIndex);
  let rightHalf = items.slice(midIndex);

  yield* MergeSort(fullItems, leftHalf, l, l + midIndex);
  // yield {
  //   items: [...fullItems],
  //   compare: [l, l + midIndex],
  // };
  yield* MergeSort(fullItems, rightHalf, l + midIndex, r + itemsLength);
  // yield {
  //   items: [...fullItems],
  //   compare: [l + midIndex, r + itemsLength],
  // };

  yield* merge(items, leftHalf, rightHalf, fullItems, l);

  return items;
}

function* merge(items, leftHalf, rightHalf, fullItems, l) {
  let leftSize = leftHalf.length;
  let rightSize = rightHalf.length;
  let i = 0;
  let j = 0;
  let k = 0;

  while (i < leftSize && j < rightSize) {
    if (leftHalf[i] <= rightHalf[j]) {
      items[k] = leftHalf[i];
      fullItems[l] = leftHalf[i];
      i++;
    } else {
      items[k] = rightHalf[j];
      fullItems[l] = rightHalf[j];
      j++;
    }
    k++;
    l++;
    yield {
      items: [...fullItems],

      pivot: l,
    };
  }

  while (i < leftSize) {
    items[k] = leftHalf[i];
    fullItems[l] = leftHalf[i];
    i++;
    k++;
    l++;
    yield {
      items: [...fullItems],
      pivot: l,
    };
  }

  while (j < rightSize) {
    items[k] = rightHalf[j];
    fullItems[l] = rightHalf[j];
    j++;
    k++;
    l++;
    yield {
      items: [...fullItems],
      pivot: l,
    };
  }
  // yield {
  //   items: [...fullItems],
  // };
}

export default MergeSort;

/*function* MergeSort(fullItems, items) {
  let itemsLength = items.length;
  if (itemsLength < 2) {
    return;
  }

  let midIndex = Math.floor(itemsLength / 2);
  let leftHalf = [];
  let rightHalf = [];
  for (let i = 0; i < midIndex; i++) {
    leftHalf.push(items[i]);
    fullItems[i] = items[i];
  }
  for (let i = midIndex; i < itemsLength; i++) {
    rightHalf.push(items[i]);
    fullItems[i] = items[i];
  }
  // return the current state of the array
  yield* MergeSort(fullItems, leftHalf);
  yield* MergeSort(fullItems, rightHalf);
  let l = 0;
  let r = midIndex;
  yield* merge(items, leftHalf, rightHalf, fullItems, l, r);

  return items;
}

function* merge(items, leftHalf, rightHalf, fullItems, l, r) {
  let leftSize = leftHalf.length;
  let rightSize = rightHalf.length;
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < leftSize && j < rightSize) {
    if (leftHalf[i] <= rightHalf[j]) {
      items[k] = leftHalf[i];
      fullItems[l] = leftHalf[i];
      i++;
      l++;
    } else {
      items[k] = rightHalf[j];
      fullItems[r] = rightHalf[j];
      j++;
      r++;
    }
    k++;

    yield {
      items: [...fullItems],
    };
  }
  while (i < leftSize) {
    items[k] = leftHalf[i];
    fullItems[l] = leftHalf[i];
    i++;
    l++;
    k++;
  }
  while (j < rightSize) {
    items[k] = rightHalf[j];
    fullItems[r] = rightHalf[j];
    r++;
    j++;
    k++;
  }
  yield {
    items: [...fullItems],
  };
}
export default MergeSort;
*/
