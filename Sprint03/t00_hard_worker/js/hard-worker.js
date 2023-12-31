class HardWorker {
    name;
    #age;
    #salary;

    constructor(name, age, salary) {
        this.name = name;
        this.#age = age;
        this.#salary = salary;
    }

    get age() {
        this.#age;
    }

    get salary() {
        this.#salary;
    }

    set age(value) {
        if(value >= 1 && value < 100) {
            this.#age = value;
        }
    }

    set salary(value) {
        if(value >= 100 && value <= 10000) {
            this.#salary = value;
        }
    }

    toObject() {
        return {
            name: this.name,
            age: this.#age,
            salary: this.#salary
        }
    }
}
