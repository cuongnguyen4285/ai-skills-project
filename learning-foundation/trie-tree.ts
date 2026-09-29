class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

export class TrieTree {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insertNode(word: string) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }

      node = node.children.get(char);
    }

    node.isEndOfWord = true;
  }

  search(word: string) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }

      node = node.children.get(char);
    }

    return node.isEndOfWord;
  }

  startsWith(prefix: string) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }

      node = node.children.get(char);
    }

    return true;
  }
}
