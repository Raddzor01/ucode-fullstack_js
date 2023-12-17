class Avenger {
    constructor(name, alias, gender, age, powers, hp) {
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;
        this.hp = hp;
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


module.exports = {
    Avenger: Avenger
}