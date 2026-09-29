export class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

export class SinglyLinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertFirstNode(data: number): Node {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;

      return newNode;
    }

    newNode.next = this.head;
    this.head = newNode;

    return newNode;
  }

  insertLastNode(data: number): Node {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;

      return newNode;
    }

    this.tail!.next = newNode;
    this.tail = newNode;

    return newNode;
  }

  insertNodeAfter(data: number, targetData: number): boolean {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.data === targetData) {
        const newNode = new Node(data);

        newNode.next = currentNode.next;
        currentNode.next = newNode;

        if (currentNode === this.tail) {
          this.tail = newNode;
        }

        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  insertNodeAtPosition(data: number, position: number): boolean {
    if (position < 0) {
      return false;
    }

    if (position === 0) {
      this.insertFirstNode(data);
      return true;
    }

    let currentNode = this.head;
    let currentPosition = 0;

    while (currentNode !== null && currentPosition < position - 1) {
      currentNode = currentNode.next;
      currentPosition++;
    }

    if (currentNode === null) {
      return false;
    }

    const newNode = new Node(data);

    newNode.next = currentNode.next;
    currentNode.next = newNode;

    if (newNode.next === null) {
      this.tail = newNode;
    }

    return true;
  }

  removeNodeAtPosition(position: number): boolean {
    if (position < 0 || this.head === null) {
      return false;
    }

    // Remove head
    if (position === 0) {
      this.head = this.head.next;

      if (this.head === null) {
        this.tail = null;
      }

      return true;
    }

    let currentNode = this.head;

    // Move to the node before the node we want to remove
    for (let i = 0; i < position - 1; i++) {
      if (currentNode.next === null) {
        return false;
      }

      currentNode = currentNode.next;
    }

    const nodeToRemove = currentNode.next;

    if (nodeToRemove === null) {
      return false;
    }

    currentNode.next = nodeToRemove.next;

    // If removing tail
    if (nodeToRemove === this.tail) {
      this.tail = currentNode;
    }

    return true;
  }
}
