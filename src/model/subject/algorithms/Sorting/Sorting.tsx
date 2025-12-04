class Sorting implements SortingModel {
  private _data: number[];

  constructor(data: number[]) {
    this._data = data;
  }

  setData(data: number[]): void {
    this._data = data;
  }
  sort(): void {
    /* Start sorting process */
  }
  start(): void {
    /* Alias to sort() */
  }
  step(): void {
    /* Next step in the algorithm */
  }
  reset(): void {
    /* Reset data */
  }
}
