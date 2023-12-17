class Avenger {
    constructor(struct) {
        this.name = struct.name;
        this.alias = struct.alias;
        this.gender = struct.gender;
        this.age = struct.age;
        this.power = struct.powers;
    }

    toString() {
        return `name: ${this.name}\n` +
            `gender: ${this.gender}\n` +
            `age: ${this.age}`;
    }

    call() {
        let string = this.alias.toUpperCase();
        for (const elementOfPower of this.power) {
            string += `\n${elementOfPower}`;
        }
        return string;
    }
}

function functionAnonAvenger(struct) {
    let avengerClass = new Avenger(struct);
    const avengerFunction = function Avenger() {
        return avengerClass.call();
    }
    avengerFunction.toString = () => {
        return avengerClass.toString();
    }
    return avengerFunction;
}

module.exports = {
    Avenger: functionAnonAvenger
}