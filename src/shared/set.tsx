import { LinkedList } from "./linkedList";

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

  size(): number {
    let current = this.head;
    let count = 0;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }
}
