import { LinkedList } from "./linkedList";
/**
 * A Set data structure implementation using a linked list.
 */
export class Set<T> extends LinkedList<T> {
  constructor() {
    super();
  }

  add(value: T): void {
    if (!this.includes(value)) {
      this.insert(value);
    }
  }

  remove(value: T): void {
    this.delete(value);
  }

  contains(value: T): boolean {
    return this.includes(value);
  }
}
