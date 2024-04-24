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
}
