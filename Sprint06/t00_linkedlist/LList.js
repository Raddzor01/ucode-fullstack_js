const LLData = require('./LLData');

module.exports.LList = class LList {
    constructor() {
        this.head = null;
    }

    getIterator() {
        let currentNode = this.head;
        return {
            next: () => {
                if (currentNode === null) return {value: null, done: true};
                let val = currentNode.data;
                currentNode = currentNode.next;
                return {value: val, done: false};
            }
        }
    }

    [Symbol.iterator] = this.getIterator;

    getFirst() {
        return this.head;
    }

    getLast() {
        let currentNode = this.head;

        if (currentNode)
            while (currentNode.next)
                currentNode = currentNode.next;

        return currentNode;
    }

    add(value) {
        let newNode = new LLData(value);
        let currentNode = this.head;

        if (!currentNode) {
            this.head = newNode;
            return;
        }
        while (currentNode.next)
            currentNode = currentNode.next;
        currentNode.next = newNode;
    }

    addFromArray(arrayOfData) {
        for (const arrayData of arrayOfData)
            this.add(arrayData);
    }

    remove(value) {
        if (!this.head)
            return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            if (currentNode.next.value === value) {
                currentNode.next = currentNode.next.next;
                return;
            }
            currentNode = currentNode.next;
        }
    }

    removeAll(value) {
        if (!this.head)
            return;

        while (this.head && this.head.value === value)
            this.head = this.head.next;

        let currentNode = this.head;
        while (currentNode && currentNode.next)
            if (currentNode.next.value === value)
                currentNode.next = currentNode.next.next;
            else
                currentNode = currentNode.next;
    }

    contains(value) {
        for (const element of this)
            if (element === value)
                return true;
        return false;
    }

    clear() {
        this.head = null;
    }

    count() {
        let count = 0;

        for (const _ of this)
            count++;

        return count;
    }

    toString() {
        let stringOfElements = '';

        for (const element of this)
            stringOfElements += `${element},`;

        console.log(stringOfElements.slice(0, stringOfElements.length - 1));
    }

    filter(callback) {
        let newList = new LList();

        for (const element of this)
            if (callback(element))
                newList.add(element);

        return newList;
    }
}