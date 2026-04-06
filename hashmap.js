import { LinkedList } from "./linked-list-IMPORT-ver.js";

function hashmap() {
    let capacity = 16;
    let loadFactor = 0.75;
    let map = [];

    function testLoadFactor() { // test capacity based on load factor, if the linkedlist is larger than the capacity*loadfactor, increase capacity by double;
        if (capacity * loadFactor < map.length) {
            capacity += capacity;
        }
    }

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % capacity; //
            hashCode = 2; // FOR TESTING ONLY
        }
        console.log("hash index is: " + hashCode);
        return hashCode;
    }

    function set(key, value) {
        const entryArray = [key, value];
        const hashedIndex = hash(key);
        if (map[hashedIndex] === undefined) { //make new linkedlist in index if index bucket is empty
            console.log(`index is empty, making index`);
            const newLinkedList = LinkedList();
            map[hashedIndex] = newLinkedList;
            map[hashedIndex].append(entryArray);
            testLoadFactor(); // test capacity
        } else {
            map[hashedIndex].replaceKeyValue(entryArray); // function that replaces values in the same bucket with matching keys, and if the keys are unique then it appends them to the linked list
            testLoadFactor(); // test capacity
        }
    }

    function get(key) {
        const hashedIndex = hash(key);
        if (map[hashedIndex] === undefined) {
            return null;
        }
        return map[hashedIndex].findKeyValue(key);
    }

    function has(key) {
        const hashedIndex = hash(key);
        if (map[hashedIndex] === undefined) {
            return false;
        }
        return map[hashedIndex].containsKeyValue(key);
    }

    function remove(key) {
        const hashedIndex = hash(key);
        if (map[hashedIndex] === undefined) {
            return false;
        }
        return map[hashedIndex].removeKeyValue(key);
    }

    function clear() {
        map = [];
    }

    function length() {
        let totalSize = 0;

        for (let i = 0; i < map.length; i++) {
            if (map[i] !== undefined) {
                totalSize += map[i].size();
            }

        }
        return totalSize;
    }

    return { map, hash, set, get, has, remove, clear, length }
}

const hashmap0 = hashmap();
hashmap0.set("test", "out_value");
hashmap0.set("test", "grok");
hashmap0.set("est", "grok");
hashmap0.set("sdfdsfsdfds", "grok");
hashmap0.set("removeKey", "pleaseRemove");
hashmap0.set("sdf2", "grok");
hashmap0.set("tyuytu3", "grok");
hashmap0.set("tail", "grok");

console.log(hashmap0.length())

// console.log(hashmap0.map[2].toString());
// hashmap0.remove("removeKey");
// console.log(hashmap0.map[2].toString());
// hashmap0.remove("test");
// console.log(hashmap0.map[2].toString());
// hashmap0.remove("tail");
console.log(hashmap0.map[2].toString());



// console.log(hashmap0.map[2].return_tail())
// console.log(hashmap0.get("est"))
// console.log(hashmap0.has("est"))
// console.log(hashmap0.has("gemini"))

// console.log(hashmap0.hash("test"));

// const map = [];

// console.log(map[5]);

