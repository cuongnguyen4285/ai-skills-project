export class Node {
  data: number;
  left: Node;
  right: Node;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  root: Node;

  insertNode(data: number) {
    if (this.root === null) {
      this.root = new Node(data);
      return;
    }

    if (data < this.root.data) {
      this.root.left = this.insertNode(data);
    } else {
      this.root.right = this.insertNode(data);
    }

    return this.root;
  }

  searchNode(data: number, node: Node | null = this.root): boolean {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    }

    if (data < node.data) {
      return this.searchNode(data, node.left);
    }

    return this.searchNode(data, node.right);
  }
}
