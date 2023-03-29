import prettyPrint from "./prettyPrint.js";
// A binary tree node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.levelOrderTransversed = [];
    this.preOrderTransversed = [];
    this.inOrderTransversed = [];
    this.postOrderTransversed = [];
  }

  buildTree(array) {
    let n = array.length;
    let root = this.sortedArrayToBST(array, 0, n - 1);
    return root;
  }
  /* A function that constructs Balanced Binary Search Tree 
 from a sorted array */
  sortedArrayToBST(array, start, end) {
    /* Base Case */
    if (start > end) {
      return null;
    }
    /* Get the middle element and make it root */
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);
    /* Recursively construct the left subtree and make it
     left child of root */
    node.left = this.sortedArrayToBST(array, start, mid - 1);
    /* Recursively construct the right subtree and make it
     right child of root */
    node.right = this.sortedArrayToBST(array, mid + 1, end);
    return node;
  }

  // insert operation in binary search tree

  insert(data, node = this.root) {
    // If the tree is empty, return a new node
    if (node == null) {
      node = new Node(data);
      return node;
    }
    // Otherwise, recur down the tree
    if (data < node.data) {
      node.left = this.insert(data, node.left);
    } else if (data > node.data) {
      node.right = this.insert(data, node.right);
    }
    return node;
  }
  //   delete operation in binary search tree
  delete(data, node = this.root) {
    if (node == null) return node;

    if (data < node.data) node.left = this.delete(data, node.left);
    else if (data > node.data) node.right = this.delete(data, node.right);
    else {
      //node with only 1 child or none
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      // node with 2 children
      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  minValue(node) {
    let minVal = node.data;
    while (node.left != null) {
      minVal = node.left.data;
      node = node.left;
    }
    return minVal;
  }
  //   find function which accepts a value and returns the node with the given value.

  find(data, node = this.root) {
    if (node.data == data) {
      return node;
    }
    if (data < node.data) {
      return this.find(data, node.left);
    }
    if (data > node.data) {
      return this.find(data, node.right);
    }
  }
  toArray(arr, value) {
    arr.push(value);
  }
  levelOrder(func = this.toArray) {
    this.levelOrderTransversed = [];
    if (this.root === null) return;
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let node = queue[0];
      func(this.levelOrderTransversed, node.data);
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
      queue.shift();
    }
    return this.levelOrderTransversed;
  }

  inOrder() {
    this.inOrderTransversed = [];
    return this.recInOrder();
  }

  recInOrder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.recInOrder(func, node.left);
    func(this.inOrderTransversed, node.data);
    this.recInOrder(func, node.right);
    return this.inOrderTransversed;
  }

  preOrder() {
    this.preOrderTransversed = [];
    return this.recPreOrder();
  }

  recPreOrder(func = this.toArray, node = this.root) {
    if (node === null) return;
    func(this.preOrderTransversed, node.data);
    this.recPreOrder(func, node.left);
    this.recPreOrder(func, node.right);
    return this.preOrderTransversed;
  }

  postOrder() {
    this.postOrderTransversed = [];
    return this.recPostOrder();
  }

  recPostOrder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.recPostOrder(func, node.left);
    this.recPostOrder(func, node.right);
    func(this.postOrderTransversed, node.data);
    return this.postOrderTransversed;
  }

  //   function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.

  height(node) {
    if (node === null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  //   function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.

  depth(data, node = this.root) {
    if (node.data === data.data) return 0;

    if (data.data < node.data) return this.depth(data, node.left) + 1;
    if (data.data > node.data) return this.depth(data, node.right) + 1;
  }
  //   function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.

  isBalanced() {
    const allNodes = this.inOrder();
    for (let i = 0; i < allNodes.length; i++) {
      const node = this.find(allNodes[i]);
      const leftSubTree = this.height(node.left);
      //   console.log(leftSubTree)
      const rightSubTree = this.height(node.right);
      if (Math.abs(leftSubTree - rightSubTree) > 1) return false;
    }
    return true;
  }

  // function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  reBalance() {
    let currentTreeArray = this.inOrder();
    this.root = this.buildTree(currentTreeArray);
  }
}
//generate random numbers between 10 - 20

let randomNum = (max) => {
  return Math.floor(Math.random() * max) + 10;
};
let randomNumber = randomNum(11);

//Computer generated array numbers
let randomArray = (num) => {
  let array = [];

  for (let i = 0; i < num; i++) {
    array.push(i);
  }
  return array;
};

let arr = randomArray(randomNumber);

//remove duplicate characters

let uniqChars = () => {
  let unique = [...new Set(arr)];
  return unique;
};

let uniqueNum = uniqChars();
// sort array
let sort = () => {
  let sortNum = uniqueNum.sort(function (a, b) {
    return a - b;
  });
  return sortNum;
};

let array = sort();
let tree = new Tree(array);

// tree.delete(50);
// console.log(tree.find(50));
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
tree.insert(50);
tree.insert(788);
tree.insert(927);
tree.insert(430);
tree.insert(269);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
prettyPrint(tree.root);
