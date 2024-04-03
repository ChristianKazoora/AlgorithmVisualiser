function* LinearSearch(items, input) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] === input) {
      yield {
        current: i,
      };
      return;
    }
    yield {
      current: i,
    };
  }
}
export default LinearSearch;
