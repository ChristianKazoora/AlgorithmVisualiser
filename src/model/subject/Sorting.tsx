class Sorting implements SortingModel {
  private data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  setData(data: number[]): void {
    this.data = data;
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
