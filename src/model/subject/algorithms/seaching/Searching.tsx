export class Searching implements SearchingModel {
  private data: number[];
  // private algorithm: SearchingAlgorithm; // E.g., Binary Search

  constructor(data: number[]) {
    this.data = data;
    // this.algorithm = algorithm;
  }

  setData(data: number[]): void {
    this.data = data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchElement(element: number): void {
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
