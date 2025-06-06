// script.js
class TreeNode {
    constructor(value, color = 'red') {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.root.color = 'black';
        } else {
            let current = this.root;
            let parent = null;

            while (current) {
                parent = current;
                if (value < current.value) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }

            newNode.parent = parent;

            if (value < parent.value) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }

            this.fixInsert(newNode);
        }
        this.render();
    }

    fixInsert(node) {
        while (node !== this.root && node.parent.color === 'red') {
            if (node.parent === node.parent.parent.left) {
                const uncle = node.parent.parent.right;

                if (uncle && uncle.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateRight(node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent.left;

                if (uncle && uncle.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateLeft(node.parent.parent);
                }
            }
        }
        this.root.color = 'black';
    }

    rotateLeft(node) {
        const rightChild = node.right;
        node.right = rightChild.left;

        if (rightChild.left) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    rotateRight(node) {
        const leftChild = node.left;
        node.left = leftChild.right;

        if (leftChild.right) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    render() {
        const container = document.getElementById('tree-container');
        container.innerHTML = '';
        this.renderNode(this.root, container, 400, 0, 200);
    }

    renderNode(node, container, x, y, levelSpacing) {
        if (!node) return;

        const nodeElement = document.createElement('div');
        nodeElement.className = `node ${node.color}`;
        nodeElement.style.left = `${x - 30}px`;  // Center the node
        nodeElement.style.top = `${y}px`;
        nodeElement.innerText = node.value;

        container.appendChild(nodeElement);

        if (node.left) {
            this.renderNode(node.left, container, x - levelSpacing / 2, y + 100, levelSpacing / 2);
            this.drawLine(container, x, y + 30, x - levelSpacing / 2, y + 100 + 30);
        }

        if (node.right) {
            this.renderNode(node.right, container, x + levelSpacing / 2, y + 100, levelSpacing / 2);
            this.drawLine(container, x, y + 30, x + levelSpacing / 2, y + 100 + 30);
        }
    }

    drawLine(container, x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'line';
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        container.appendChild(line);
    }
}

const tree = new RedBlackTree();

function insert() {
    const value = parseInt(document.getElementById('value-input').value, 10);
    if (!isNaN(value)) {
        tree.insert(value);
    }
}

function deleteNode() {
    // Implement deletion if needed
}

document.addEventListener('DOMContentLoaded', () => {
    tree.render();
});
