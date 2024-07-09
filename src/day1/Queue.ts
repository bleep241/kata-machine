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
    const newNode = { // new node to be added
      value: item,
    } as QNode<T>;
    
    // need to have the tail point to D
    // need to have C.next point to D
    this.length++; // increases length of the queue
    if (!this.tail) {
      this.tail = this.head = newNode; // if there is no tail then there is no head so point both to the new node
    } else {
      // A -> B -> C adding an item -> D
      this.tail.next = newNode; // this there is a tail then point the current tail to the next node
      this.tail = newNode; // make our new node the tail
    }
    
  }

  deque(): T | undefined {
    if (!this.head) {
      return undefined; // if there is no node on the queue return undefined
    }

    this.length--; 
    
    // A -> B -> C
    const head = this.head; // save a reference to the head
    this.head = this.head.next; // point the head of the queue to the node that is next in line to the head
    head.next = undefined; // removing reference to the previous head to effectively 'take them out of the queue/line'

    if (this.length === 0) {
      this.tail = this.head = undefined; // if there are no nodes then there is no tail
    }

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value; // get the value of the head and check if it exists ? return value of the head : return undefined
  }
}