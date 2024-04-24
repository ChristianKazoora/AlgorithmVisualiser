import { Node } from "./Node";
export class LinkedList<T> {
  head: Node<T> | null;
  constructor() {
    this.head = null;
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

  forEach(callback: (data: T) => void) {
    let current = this.head;
    while (current !== null) {
      callback(current.data);
      current = current.next;
    }
  }

  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}
