class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array)
    }

    insert(data, node = this.root) {
        if (node === null) return (node = new Node(data))

        if (node.data < data) {
            node.right = this.insert(data, node.right)
        } else {
            node.left = this.insert(data, node.left)
        }
        return node
    }

    delete(data) {
        const deleteNode = function(node, data) {
            if (node === null) {
                return null
            }
            if (data == node.data) {
                if (node.left == null && node.right == null) {
                    return null
                } else if (node.left == null) {
                    return node.right
                } else if (node.right == null) {
                    return node.left
                }

                let tempNode = node.right
                while (tempNode.left !== null) {
                    tempNode = tempNode.left
                }
                node.data = tempNode.data
                node.right = deleteNode(node.right, tempNode.data)
                return node

            } else if (data < node.data) {
                node.left = deleteNode(node.left, data)
                return node
            } else {
                node.right = deleteNode(node.right, data)
                return node
            }
        }
        this.root = deleteNode(this.root, data)
    }

    find(data) {
        let node = this.root
        while (node.data !== data) {
            if (data < node.data) {
                node = node.left
            } else if (data > node.data) {
                node = node.right
            } else if (node === null) {
                return null
            }
        }
        return node
    }

    levelOrder(task = null) {
        let root = this.root
        let output = []
        let queue = [root]

        while (queue.length) {
            for (let item of queue) {
                let node = queue.pop()
                if (task != null) {
                    task(node.data)
                }
                output.push(node.data)
                if (node.left) queue.unshift(node.left)
                if (node.right) queue.unshift(node.right)
            }
        }
        if (task === null) {
            return output
        }
    }

    inOrder(task = null) {
        let output = []
        let root = this.root
        let getNode = (node) => {
            if (node.left) getNode(node.left)
            if (task != null) {
                task(node.data)
            }
            output.push(node.data)
            if (node.right) getNode(node.right)
        }
        getNode(root)
        if (task === null) {
            return output
        }
    }

    preOrder(task = null) {
        let output = []
        let root = this.root
        let getNode = (node) => {
            if (task != null) {
                task(node.data)
            }
            output.push(node.data)
            if (node.left) getNode(node.left)
            if (node.right) getNode(node.right)
        }
        getNode(root)
        if (task === null) {
            return output
        }
    }

    postOrder(task = null) {
        let output = []
        let root = this.root
        const getNode = (node) => {
            if (node.left) getNode(node.left)
            if (node.right) getNode(node.right)
            if (task != null) {
                task(node.data)
            }
            output.push(node.data)
        }
        getNode(root)
        if (task === null) {
            return output
        }
    }

    height(node = this.root) {
        if (node === null) return 0
        let left = this.height(node.left)
        let right = this.height(node.right)
        return Math.max(left, right) + 1
    }

    depth(data) {
        let node = this.root
        let depth = 0
        while (node.data !== data) {
            depth++
            if (data < node.data) {
                node = node.left
            } else if (data > node.data) {
                node = node.right
            } else if (node === null) {
                return null
            }
        }
        return depth
    }

    isBalanced(node = this.root) {
        if (node === null) return false

        let left = node.left
        let right = node.right

        if (Math.abs(this.height(left) - this.height(right)) > 1) {
            return false
        } else {
            return true
        }
    }

    rebalance() {
        if (this.isBalanced()) return

        let newTreeArray = this.inOrder()

        let newTree = new Tree(newTreeArray)

        return newTree
    }
}

function buildTree(array) {
    if (array.length === 0) {
        return null
    }

    array.sort((a, b) => a - b);
    array = array.filter((item, index) => array.indexOf(item) === index)

    let mid = Math.floor(array.length / 2)
    let node = new Node(array[mid])

    node.left = buildTree(array.slice(0, mid))
    node.right = buildTree(array.slice(mid + 1))

    return node
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function mamaMia(thing) {
    console.log(`Mama mia! It's a ${thing}!`)
}

// DRIVER

const randomArray = (digits, max = 100) => {
    let array = []
    for (let i = 0; i < digits; i++) {
        array.push(Math.floor(Math.random() * max))
    }
    return array
}

const treeDriver = (digits = 5) => {
    let tree = new Tree(randomArray(digits))
    prettyPrint(tree.root)
    console.log(`This tree is balanced: ${tree.isBalanced()}`)
    console.log(`Level order: ${tree.levelOrder()}`)
    console.log(`Pre order: ${tree.preOrder()}`)
    console.log(`Post order: ${tree.postOrder()}`)
    console.log(`In order: ${tree.inOrder()}`)

    for (let i = 0; i < digits; i++) {
        tree.insert(Math.floor(Math.random() * 100))
    }
    console.log(`${digits} digits have been added to the tree.`)
    prettyPrint(tree.root)
    console.log(`This tree is balanced: ${tree.isBalanced()}`)
    if (!(tree.isBalanced())) {
        tree = tree.rebalance()
        console.log(`Rebalance has been called.`)
        console.log(`This tree is balanced: ${tree.isBalanced()}`)
    }
    console.log(`Level order: ${tree.levelOrder()}`)
    console.log(`Pre order: ${tree.preOrder()}`)
    console.log(`Post order: ${tree.postOrder()}`)
    console.log(`In order: ${tree.inOrder()}`)
    prettyPrint(tree.root)
}