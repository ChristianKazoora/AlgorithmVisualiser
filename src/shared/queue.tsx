import { LinkedList } from "./linkedList";
/**
 * A generic Queue class extending LinkedList.
 */
export class Queue<T> extends LinkedList<T> {
  enqueue(data: T) {
    this.insert(data);
  }
  dequeue(): T | null {
    if (this.head === null) {
      return null;
    }
    let data = this.head.data;
    this.delete(data);
    return data;
  }
}
