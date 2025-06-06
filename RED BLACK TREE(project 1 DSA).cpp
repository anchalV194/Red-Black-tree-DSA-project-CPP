#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node* parent;
    bool color; // true for RED, false for BLACK

    Node(int data) {
        this->data = data;
        left = NULL;
        right = NULL;
        parent = NULL;
        color = true; // default color is RED
    }
};

class RedBlackTree {
private:
    Node* root;
    Node* nil;

    void leftRotate(Node* x) {
        Node* y = x->right;
        x->right = y->left;
        if (y->left != nil) {
            y->left->parent = x;
        }
        y->parent = x->parent;
        if (x->parent == NULL) {
            root = y;
        } else if (x == x->parent->left) {
            x->parent->left = y;
        } else {
            x->parent->right = y;
        }
        y->left = x;
        x->parent = y;
    }

    void rightRotate(Node* x) {
        Node* y = x->left;
        x->left = y->right;
        if (y->right != nil) {
            y->right->parent = x;
        }
        y->parent = x->parent;
        if (x->parent == NULL) {
            root = y;
        } else if (x == x->parent->right) {
            x->parent->right = y;
        } else {
            x->parent->left = y;
        }
        y->right = x;
        x->parent = y;
    }

    void fixInsert(Node* k) {
        Node* u;
        while (k->parent->color) { // while parent is RED
            if (k->parent == k->parent->parent->right) {
                u = k->parent->parent->left;
                if (u->color) { // if uncle is RED
                    u->color = false; // set uncle to BLACK
                    k->parent->color = false; // set parent to BLACK
                    k->parent->parent->color = true; // set grandparent to RED
                    k = k->parent->parent;
                } else {
                    if (k == k->parent->left) {
                        k = k->parent;
                        rightRotate(k);
                    }
                    k->parent->color = false; // set parent to BLACK
                    k->parent->parent->color = true; // set grandparent to RED
                    leftRotate(k->parent->parent);
                }
            } else {
                u = k->parent->parent->right;

                if (u->color) { // if uncle is RED
                    u->color = false; // set uncle to BLACK
                    k->parent->color = false; // set parent to BLACK
                    k->parent->parent->color = true; // set grandparent to RED
                    k = k->parent->parent;
                } else {
                    if (k == k->parent->right) {
                        k = k->parent;
                        leftRotate(k);
                    }
                    k->parent->color = false; // set parent to BLACK
                    k->parent->parent->color = true; // set grandparent to RED
                    rightRotate(k->parent->parent);
                }
            }
            if (k == root) {
                break;
            }
        }
        root->color = false; // set root to BLACK
    }

public:
    RedBlackTree() {
        nil = new Node(0);
        nil->color = false; // set nil node to BLACK
        root = nil;
    }

    void insert(int data) {
        Node* node = new Node(data);
        node->parent = NULL;
        node->left = nil;
        node->right = nil;

        Node* y = NULL;
        Node* x = root;

        while (x != nil) {
            y = x;
            if (node->data < x->data) {
                x = x->left;
            } else {
                x = x->right;
            }
        }

        node->parent = y;
        if (y == NULL) {
            root = node;
        } else if (node->data < y->data) {
            y->left = node;
        } else {
            y->right = node;
        }

        if (node->parent == NULL) {
            node->color = false; // set root node to BLACK
            return;
        }

        if (node->parent->parent == NULL) {
            return;
        }

        fixInsert(node);
    }

    void inorder() {
        inorderHelper(root);
    }

    void inorderHelper(Node* node) {
        if (node!= nil) {
            inorderHelper(node->left);
            cout << node->data << " ";
            inorderHelper(node->right);
        }
    }
};

int main() {
    RedBlackTree tree;
    tree.insert(8);
    tree.insert(18);
    tree.insert(5);
    tree.insert(15);
    tree.insert(20);
    tree.insert(17);
    tree.insert(25);

    cout << "Inorder traversal of the constructed tree is: ";
    tree.inorder();
    cout << endl;

    return 0;
}
