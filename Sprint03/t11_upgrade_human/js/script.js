class Human {
    firstName;
    lastName;
    gender;
    age;
    calories;
    #isBusy = false;
    constructor(firstName, lastName, gender, age = 20, calories = 400) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.calories = calories;
    }

    get isBusy() {
        return this.#isBusy;
    }

    set isBusy(value) {
        this.#isBusy = value;
    }

    sleepFor() {
        let time = prompt('Enter sleep time(in seconds):', '');
        if (time === '') {
            alert('Invalid input');
            return;
        }
        if (this.#isBusy === true) {
            alert('Human is doing something now. Try again later');
            return;
        }
        this.#isBusy = true;
        statusStr.innerText = 'I`m sleeping...';
        setTimeout(() => {
            statusStr.innerText = `I'm awake now`;
            setTimeout(() => { if(!this.#isBusy) statusStr.innerText = 'Idle'; }, 3000);
            this.#isBusy = false;
        }, time * 1000);
    }

    feed() {
        if (this.#isBusy === true) {
            alert('Human is doing something now. Try again later');
            return;
        }
        if (this.calories >= 500) {
            statusStr.innerText = `I'm not hungry`;
            setTimeout(() => { if(!this.#isBusy) statusStr.innerText = 'Idle'; }, 3000);
            return;
        }
        this.#isBusy = true;
        this.calories += 200;
        statusStr.innerText = 'Nom Nom Nom';
        setTimeout(() => {
            document.querySelector('.flex-container p:nth-child(8)').innerText = "Calories: " + this.calories;
            if (this.calories <= 500) {
                statusStr.innerText = `I'm still hungry`;
                setTimeout(() => { if(!this.#isBusy) statusStr.innerText = 'Idle'; }, 3000);
            } else {
                statusStr.innerText = 'Idle';
            }
            this.#isBusy = false;
        }, 10000);
    }

    starve() {
        setTimeout(() => {
            this.calories -= 200;
            if (this.calories < 0) {
                this.calories = 0;
            }
            document.querySelector('.flex-container p:nth-child(8)').innerText = "Calories: " + this.calories;
        }, 5000);
        setInterval(() => {
            this.calories -= 200;
            document.querySelector('.flex-container p:nth-child(8)').innerText = "Calories: " + this.calories;
        }, 60000);
    }

    update_info() {
        document.querySelector('.flex-container p:nth-child(3)').innerText = "First Name: " + this.firstName;
        document.querySelector('.flex-container p:nth-child(4)').innerText = "Last Name: " + this.lastName;
        document.querySelector('.flex-container p:nth-child(6)').innerText = "Gender: " + this.gender;
        document.querySelector('.flex-container p:nth-child(7)').innerText = "Age: " + this.age;
        document.querySelector('.flex-container p:nth-child(8)').innerText = "Calories: " + this.calories;
    }

}

class Superhero extends Human {
    heroDescription;
    fly() {
        if (this.isBusy === true) {
            alert('Human is doing something now. Try again later');
            return;
        }
        this.isBusy = true;
        statusStr.innerText = `I'm flying!`;
        setTimeout(() => {
            setTimeout(() => { if(!this.isBusy) statusStr.innerText = 'Idle'; }, 3000);
            this.isBusy = false;
        }, 10000);
    }

    fightWithEvil() {
        if (this.isBusy === true) {
            alert('Human is doing something now. Try again later');
            return;
        }
        statusStr.innerText = `Khhhh-chh... Bang-g-g-g... Evil is defeated!`;
        setTimeout(() => { if(!this.isBusy) statusStr.innerText = 'Idle'; }, 3000);
    }
}

const statusStr = document.getElementById('status');

var human = new Human('John', 'Doe', 'Rocketdyne F-1');
var hero;

human.update_info();
human.starve();

document.querySelector('#sleep').addEventListener('click', () => {
    human.sleepFor();
});

document.querySelector('#eat').addEventListener('click', () => {
    human.feed();
});

document.querySelector('#fly').addEventListener('click', () => {
    hero.fly();
});

document.querySelector('#fight-with-evil').addEventListener('click', () => {
    hero.fightWithEvil();
});

document.querySelector('#turn-into-superhero').addEventListener('click', () => {
    if(human.calories < 500) {
        statusStr.innerText = 'Too hungry for that!';
        return;
    }

    hero = new Superhero('Thor', 'Odinson', 'Male', 1500, human.calories);
    hero.heroDescription = 'Dude with badass hammer';

    document.querySelector('.flex-container p:nth-child(5)').innerText = 'Description: ' + hero.heroDescription;

    hero.update_info();

    document.querySelector('img').src = 'https://i.pinimg.com/550x/40/74/71/40747151783756ff94b39e018048d30e.jpg';
    document.querySelector('.flex-container p:nth-child(5)').classList.remove('hidden');
    document.querySelector('#fly').classList.remove('hidden');
    document.querySelector('#fight-with-evil').classList.remove('hidden');
});