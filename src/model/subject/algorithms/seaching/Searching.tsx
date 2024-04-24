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
  searchElement(element: number): void {
    /* Implementation */
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
