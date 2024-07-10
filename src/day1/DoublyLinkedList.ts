type Node<T> = {
  value: T,
  prev?: Node<T>,
  next?: Node<T>,
}

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;



  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  prepend(item: T): void {
    const newNode: Node<T> = {
      value: item,
    };

    this.length++;

    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("Oh no you can't insert a node here!");
    } else if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const curr = this.getAt(idx) as Node<T>;

    const newNode: Node<T> = {
      value: item,
    };

    // A <-> B <-> C <-> D
    // insert     E in front of C
    newNode.next = curr; // E next points to C
    newNode.prev = curr.prev; // E prev points to C's prev (B)
    curr.prev = newNode; // C's prev points to E
    
    if (newNode.prev) {
      newNode.prev.next = newNode;
    }

  }

  append(item: T): void {
    const newNode: Node<T> = {
      value: item,
    };

    this.length++;

    if (!this.tail) {
      this.head = this.tail = newNode;
      return;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }

  remove(item: T): T | undefined {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; i++) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }

    if (!curr) {
      return undefined;
    }

    return this.removeNode(curr);
    // this.length--;

    // if (this.length === 0) {
    //   const out = this.head?.value;
    //   this.head = this.tail = undefined;
    //   return out;
    // }

    // if (curr.prev) {
    //   curr.prev = curr.next;
    // }

    // if (curr.next) {
    //   curr.next = curr.prev;
    // }

    // if (curr === this.head) {
    //   this.head = curr.next;
    // } 

    // if (curr === this.tail) {
    //   this.tail = curr.prev;
    // }
    // curr.prev = curr.next = undefined;
    // return curr.value;
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx);

    if (!node) {
      return undefined;
    }

    return this.removeNode(node);
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;

    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    } 

    if (node === this.tail) {
      this.tail = node.prev;
    }

    node.prev = node.next = undefined;
    return node.value;
  }

  private getAt(idx: number): Node<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; i++) {
      curr = curr.next;
    }

    return curr;
  }
}