export interface Node<T> {
  data: T;
  next: Node<T> | null;
}
