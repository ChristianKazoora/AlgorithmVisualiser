export class Searching implements SearchingModel {
  private _data: number[];
  // private algorithm: SearchingAlgorithm; // E.g., Binary Search

  constructor(data: number[]) {
    this._data = data;
    // this.algorithm = algorithm;
  }

  setData(data: number[]): void {
    this._data = data;
  }
  searchElement(_element: number): void {
    /* ToDo implement element */
  }
  start(): void {
    /* Initialize search */
  }
  step(): void {
    /* Next step in the algorithm */
  }
  reset(): void {
    /* Reset data */
  }
}
