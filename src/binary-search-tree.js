const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data) {
		const newNode = new Node(data);
		//
		if (!this.rootNode) {
			this.rootNode = newNode;
			return;
		}
		//
		let curNode = this.rootNode;
		while (curNode) {
			if (curNode.data > newNode.data) {
				if (!curNode.left) {
					curNode.left = newNode;
					return;
				}
				curNode = curNode.left;
			} else {
				if (!curNode.right) {
					curNode.right = newNode;
					return;
				}
				curNode = curNode.right;
			}
		}
	}

	has(data) {
		return this.find(data) != null;
	}

	find(data) {
		let curNode = this.rootNode;
		//
		while (curNode) {
			if (curNode.data === data) {
				return curNode;
			}
			if (curNode.data < data) {
				curNode = curNode.right;
			} else {
				curNode = curNode.left;
			}
		}
		return null;
	}

	remove(data, curNode = this.rootNode) {
		if (!curNode) {
			return null;
		}
		//
		if (data < curNode.data) {
			curNode.left = this.remove(data, curNode.left);
			return curNode;
		} else if (curNode.data < data) {
			curNode.right = this.remove(data, curNode.right);
			return curNode;
		} else {
			if (!curNode.left && !curNode.right) {
				return null;
			}
			//
			if (!curNode.left) {
				curNode = curNode.right;
				return curNode;
			}
			//
			if (!curNode.right) {
				curNode = curNode.left;
				return curNode;
			}
			//
			let minRightSubtree = curNode.right;
			while (minRightSubtree.left) {
				minRightSubtree = minRightSubtree.left;
			}
			//
			curNode.data = minRightSubtree.data;
			curNode.right = this.remove(minRightSubtree.data, curNode.right);
			return curNode;
		}
	}

	min() {
		let curNode = this.rootNode;
		while (curNode) {
			if (curNode.left == null) {
				return curNode.data;
			} else {
				curNode = curNode.left;
			}
		}
		return null;
	}

	max() {
		let curNode = this.rootNode;
		while (curNode) {
			if (curNode.right == null) {
				return curNode.data;
			} else {
				curNode = curNode.right;
			}
		}
		return null;
	}
}

module.exports = {
	BinarySearchTree,
};
