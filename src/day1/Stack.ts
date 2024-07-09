type Node<T> = {
  value: T,
  next?: Node<T>,
}

export default class Stack<T> { //Last in First Out or LiFO data structure
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  // A <- B <- C <- D <+- (E)
  push(item: T): void {
    const newNode: Node<T> = {
      value: item,
    };

    this.length++;

    if (!this.head) {
      this.head = newNode;
    }

    newNode.next = this.head; // E node's next now points to previous head
    this.head = newNode; // stack's head now points to E
  }
  pop(): T | undefined { // save reference to the current head, make the stack's head next point to the new head, return the saved head's value
    if (!this.head) return undefined;

    this.length--;

    const head = this.head;
    this.head = this.head.next;
    head.next = undefined;

    if (this.length === 0) {
      this.head = undefined; // if there are no nodes left then there is no head
    }

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}