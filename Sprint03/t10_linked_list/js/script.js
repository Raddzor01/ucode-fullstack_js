class LinkedList {

    #data;
    #next;

    add(value) {
        if (!this.#data) {
            this.#data = value;
            this.#next = null;
        } else {
            let current = this;
            while (current.#next) {
                current = current.#next;
            }

            const newNode = new LinkedList();
            newNode.#data = value;
            newNode.#next = null;
            current.#next = newNode;
        }
    }

    remove(value) {
        let current = this;
        let previous = null;

        while (current) {
            if (current.#data === value) {
                if (previous) {
                    previous.#next = current.#next;
                } else {
                    this.#data = current.#next ? current.#next.#data : null;
                    this.#next = current.#next ? current.#next.#next : null;
                }
                // break;
            }
            previous = current;
            current = current.#next;
        }
    }

    contains(value) {
        let current = this;

        while (current) {
            if (current.#data === value) {
                return true;
            }
            current = current.#next;
        }

        return false;
    }

    *[Symbol.iterator]() {
        let current = this;
        while (current !== null) {
            yield current.#data;
            current = current.#next;
        }
    }

    clear() {
        this.#data = null;
        this.#next = null;
    }

    count() {
        let count = 0;
        let current = this;

        while (current) {
            count++;
            current = current.#next;
        }

        return count;
    }


    log() {
        let str = '';
        for (let index of this) {
            if (index !== null)
                str += index + ', ';
        }

        str = str.slice(0, str.length - 2);
        console.log(str);
    }
}

function createLinkedList(arr) {
    let linkedList = new LinkedList();
    for (let index of arr) {
        linkedList.add(index);
    }
    return linkedList;
}

// const linkedList_test = createLinkedList([100, 1, 2, 3, 100, 4, 5, 100]);
// linkedList_test.log(); // "100, 1, 2, 3, 100, 4, 5, 100"
// while (linkedList_test.remove(100));
// linkedList_test.log(); // "1, 2, 3, 4, 5"
// linkedList_test.add(10);
// linkedList_test.log(); // "1, 2, 3, 4, 5, 10"
// console.log(linkedList_test.contains(10)); // "true"
// let sum = 0;
// for (const n of linkedList_test) {
//     sum += n;
// }
// console.log(sum); // "25"
// linkedList_test.clear();
// linkedList_test.log(); // ""
