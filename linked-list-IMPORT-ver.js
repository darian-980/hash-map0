export function LinkedList() {
    let head = null;
    let tail = null;

    function createNode() {
        let value = null;
        let nextNode = null;

        return { value, nextNode };
    }

    function append(value) {
        const newnode = createNode();
        newnode.value = value;
        if (head === null) {
            head = newnode;
        }
        if (tail !== null) {
            tail.nextNode = newnode;
        }
        tail = newnode;
        console.log("appending:", value)
    }

    function prepend(value) {
        const newnode = createNode();
        newnode.value = value;
        if (tail === null) {
            tail = newnode;
        }
        if (head !== null) {
            newnode.nextNode = head;
        }
        head = newnode;

    }

    function return_head() {
        if (head === null) {
            return undefined;
        }
        return head.value;
    }

    function return_tail() {
        if (tail === null) {
            return undefined;
        }
        return tail.value;
    }

    function pop() {
        if (head === null) {
            return undefined;
        }
        const oldHead = head.value;
        // console.log("old head: " + oldHead)
        head = head.nextNode;
        // console.log("new head " + head.value)
        return oldHead;
    }



    // THIS FUNCTION WILL BE USED FOR ITERATING THROUGH THE LINKED LIST, IT PERFORMS CALLBACKS FOR WHATEVER TASK YOU ASK IT TO
    function iterate(node, nextIteration, nullIteration = () => { }) {
        if (head === null) {
            return undefined
        }
        nextIteration(node); // call this once every iteration to perform a specific task
        if (node.nextNode === null) {
            nullIteration(node); // call this if the next node is null
        }
        else {
            iterate(node.nextNode, nextIteration, nullIteration)
        }
        // return node.value;
    }

    function toString() {
        let printString = "";

        function nextIteration(node) {
            printString += "(" + node.value + ") -> "; // does this every recursive iteration
        }

        function nullIteration(node) {
            printString += "null"; // when there is no more nodes, do this
        }


        // return iterate(head)
        iterate(head, nextIteration, nullIteration);
        return printString;

    }

    function size() {
        let totalSize = 0;

        function nextIteration(node) {
            totalSize++;
        }

        iterate(head, nextIteration);
        return totalSize;
    }

    function findIndex(value) {
        let index = 0;

        function nextIteration(node) {
            if (value === node.value) {
                throw { value: index }
            }
            index++;
        }
        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return -1;
    }

    function contains(value) {

        function nextIteration(node) {
            if (value === node.value) {
                throw { value: true }
            }
        }
        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return false;

    }

    function at(index) {
        let indexCount = 0;

        function nextIteration(node) {
            if (indexCount === index) {
                // console.log(indexCount, index)
                throw { value: node.value } // we have to do this instead of return because return won't end the recursive function
            } else {
                indexCount++;
            }
        }

        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return undefined; //return undefined if the try catch fails (the index provided is larger than the linked list)

    }

    function replaceKeyValue(value) { // new function made specifically for linkedlists
        if (Array.isArray(value)) {

            function nextIteration(node) {
                if (value[0] === node.value[0]) {
                    console.log(`value[0]: ` + value[0] + ` has a duplicate.. replacing ` + node.value[1] + ` with: ` + value[1]);
                    node.value[1] = value[1];
                    throw { value: true }
                }
            }
            try {
                iterate(head, nextIteration);
                console.log("value not found in array bucket..appending");
                append(value);
            } catch (e) {
                return e.value;
            };

            return false;

        }
    }

    function removeKeyValue(value) {
        function nextIteration(node) {
            if (value === node.nextNode.value[0]) {
                if (node.nextNode === tail) {
                    console.log(`value[0]: ` + node.nextNode.value[0] + ` is found as the tail..removing the key, value: ` + node.nextNode.value[1] + `. the new tail is ` + node.value[0]);
                    node.nextNode = null;
                    tail = node;
                } else {
                    console.log(`value[0]: ` + node.nextNode.value[0] + ` is found..removed the key and the value: ` + node.nextNode.value[1]);
                    node.nextNode = node.nextNode.nextNode;
                }
                throw { value: true }
            } else if (value === node.value[0] && node === head) {
                console.log(`value[0]: ` + node.value[0] + ` is found as the head..removed the key and the value: ` + node.value[1] + `. the new head is ` + node.nextNode.value[0]);
                head = node.nextNode;
                if (head === null) {
                    tail = null;
                    console.log(`head is null..tail is now null`)
                }
                throw { value: true }
            }
        }
        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return false;


    }

    function findKeyValue(value) {
        function nextIteration(node) {
            if (value === node.value[0]) {
                console.log(`value[0] found, the value for the key: ` + value + ` is: ` + node.value[1])
                throw { value: node.value[1] }
            }
        }
        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return null;
    }

    function containsKeyValue(value) {
        function nextIteration(node) {
            if (value === node.value[0]) {
                console.log(`key ` + node.value[0] + ` exists`)
                throw { value: true }
            }
        }
        try {
            iterate(head, nextIteration);
        } catch (e) {
            return e.value;
        };

        return false;
    }

    function allKeys() {
        let keyArray = [];

        function nextIteration(node) {
            keyArray.push(node.value[0]) //does this every recursive iteration
        }

        // return iterate(head)
        iterate(head, nextIteration);
        return keyArray;

    }


    function allValues() {
        let valueArray = [];

        function nextIteration(node) {
            valueArray.push(node.value[1]) //does this every recursive iteration
        }

        // return iterate(head)
        iterate(head, nextIteration);
        return valueArray;

    }

    function allEntries() {
        let entriesArray = [];

        function nextIteration(node) {
            entriesArray.push(node.value) //does this every recursive iteration
        }

        // return iterate(head)
        iterate(head, nextIteration);
        return entriesArray;

    }

    return { get head() { return head; }, get tail() { return tail; }, append, prepend, return_head, return_tail, toString, size, at, pop, contains, findIndex, replaceKeyValue, findKeyValue, containsKeyValue, removeKeyValue, allKeys, allValues, allEntries }; // iterate() not returned so that it cannot be called manually
}




// const linked1 = LinkedList();
// linked1.prepend("test");
// linked1.append(1);
// linked1.append(7);
// linked1.append(4);
// linked1.append(6);
// linked1.prepend(32);
// linked1.append(3);
// linked1.append(2);
// linked1.append(3);
// linked1.prepend(44);

// console.log("head: " + linked1.return_head())
// console.log("tail: " + linked1.return_tail())
// console.log(linked1.toString())
// console.log("linkedlist size: " + linked1.size());

// const index = 3;
// console.log("linkedlist index " + index + ": " + linked1.at(index));
// console.log("popping head..old head is " + linked1.pop())

// const containsValue = 2
// console.log("does list contain " + containsValue + "?: " + linked1.contains(containsValue))

// console.log(linked1.toString())
// console.log(linked1.findIndex(2))
// console.log()