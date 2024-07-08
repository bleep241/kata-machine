type QNode<T> = {
  value: T,
  next?: QNode<T>,
}

export default class Queue<T> {
  public length: number;
  private head?: QNode<T>;
  private tail?: QNode<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    // A -> B -> C adding an item -> D
    const newNode = {
      value: item,
    } as QNode<T>;

    // need to have the tail point to D
    // need to have C.next point to D
    this.length++;
    if (!this.tail) {
      this.tail = this.head = newNode; // if there is no tail then there is no head so point both to the new node
    }

    this.tail.next = newNode; // this there is a tail then point the current tail to the next node
    this.tail = newNode; // make our new node the tail
  }
  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    // A -> B -> C
    this.length--;

    const head = this.head; // save a reference to the head
    this.head = this.head.next; // point the head of the queue to the node that is next in line to the head
    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}