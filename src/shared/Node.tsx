/**
 * Represents a node in a linked list.
 */
export interface Node<T> {
  data: T;
  next: Node<T> | null;
}
