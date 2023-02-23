
import log from "../config/log";

class TreeNode {
  key: any;
  value: any;
  parent: any;
  children: any[];
  level: number;
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  root: TreeNode;
  constructor(key, value = key) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, key, value) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  insertMany(parentNodeKey, items: [], mapperModelModel: any, mapperModels: any) {//node[key, value]
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        items?.forEach((element: any) => {
          if (mapperModelModel[element].number) {
            (mapperModelModel[element].number).forEach(itemModel => {
              node.children.push(new TreeNode(itemModel, mapperModels[itemModel], node));
            });
          }

        });
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter(c => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

function print(tree: TreeNode, indent: string, last: boolean) {
  log.info(indent, '+--', tree.value);
  indent += last ? " " : " | ";
  for (var i = 0; i < tree.children.length; i++) {
    print(tree.children[i], indent, i == tree.children.length - 1)
  }
}

export { Tree, TreeNode, print }