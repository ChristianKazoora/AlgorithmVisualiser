import { Node } from "./Node";
export class LinkedList<T> {
  head: Node<T> | null;
  constructor() {
    this.head = null;
  }
  *[Symbol.iterator]() {
    let current = this.head;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }
  insert(data: T) {
    let newNode: Node<T> = { data: data, next: null };
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  delete(data: T) {
    if (this.head === null) {
      return;
    }
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
  isEmpty() {
    return this.head === null;
  }
  includes(data: T) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
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
  forEach(callback: (data: T) => void) {
    let current = this.head;
    while (current !== null) {
      callback(current.data);
      current = current.next;
    }
  }
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;
    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
  get(index: number): T | null {
    if (index < 0) {
      return null;
    }
    let current = this.head;
    let count = 0;
    while (current !== null) {
      if (count === index) {
        return current.data;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}
