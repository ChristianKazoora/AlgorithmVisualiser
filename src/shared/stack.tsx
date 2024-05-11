import { LinkedList } from "./linkedList";
import { Node } from "./Node";
export class Stack<T> extends LinkedList<T> {
  push(data: T) {
    let newNode: Node<T> = { data: data, next: this.head };
    this.head = newNode;
  }
  pop(): T | null {
    if (this.head === null) {
      return null;
    }
    let data = this.head.data;
    this.head = this.head.next;
    return data;
  }
  peek(): T | null {
    if (this.head === null) {
      return null;
    }
    return this.head.data;
  }
  includes(data: T): boolean {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
}
