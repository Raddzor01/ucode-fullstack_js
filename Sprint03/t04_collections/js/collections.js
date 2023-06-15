class guestList {
    #container = new Set();

    constructor(guests) {
        guests.forEach(element => {
            this.#container.add(element);
        });
    }

    addGuest(guest) {
        this.#container.add(guest);
    }

    checkGuest(guest) {
        return this.#container.has(guest);
    }

    deleteGuest(guest) {
        this.#container.delete(guest);
    }
}

class menu {
    #container = new Map();

    constructor(menu) {
        menu.forEach(element => {
            this.#container.set(element[0], element[1]);
        });
    }

    addDish(dish, price) {
        this.#container.set(dish, price);
    }

    checkAllDishes() {
        return this.#container.entries();
    }

}

class bankVault {
    #container = new WeakMap();

    constructor(boxes) {
        boxes.forEach(elements => {
            const [safe, credentials] = elements;
            this.#container.set(credentials, safe);
        });
    }

    addBox(box, credentials) {
        return this.#container.set(credentials, box);
    }

    checkBox(credentials) {
        return this.#container.has(credentials);
    }

    getBox(credentials) {
        return this.#container.get(credentials);
    }

    get container() {
        return this.#container;
    }
}

class coinCollection {
    #container = new WeakSet();

    constructor(coins) {
        coins.forEach(element => {
            this.#container.add(element);
        });
    }

    addCoin(coin) {
        this.#container.add(coin);
    }

    checkAllCoins() {
        return this.#container;
    }

}

const guestList_test = new guestList(['Yan', 'Pasha', 'Kyrilo', 'Artem', 'Vasya']);

console.log('Is Ira in guest list? ' + guestList_test.checkGuest('Ira'));
console.log('Is Artem in guest list? ' + guestList_test.checkGuest('Artem'));

const menu_text = new menu([
    ['coockies', '2€'],
    ['chockolate', '3€'],
    ['milk', '1€']
]);

menu_text.addDish('Pizza', '20€');
menu_text.addDish('Pasta', '15€');

console.log(menu_text.checkAllDishes());

const bankVault_test = new bankVault([
    [
        box1 = { id: 1234, name: 'Yan', amount: '100€' },
        credential1 = { username: '234', password: '234' }
    ],
    [
        box2 = { id: 2345, name: 'Pasha', amount: '200€' },
        credential2 = { username: '123', password: '123' }
    ],
    [
        box3 = { id: 3456, name: 'Kyrilo', amount: '300€' },
        credential3 = { username: 'qwerty', password: 'zxc' }
    ],
    [
        box4 = { id: 4567, name: 'Artem', amount: '400€' },
        credential4 = { username: 'asdf', password: 'lkjh' }
    ]
]);

bankVault_test.addBox(
    box5 = { id: 5678, name: 'Vasya', amount: '500€' },
    credential5 = { username: 'zxc', password: 'zxc' }
);

console.log(bankVault_test.checkBox(credential3));
console.log(bankVault_test.getBox(credential3));
console.log(bankVault_test.getBox(credential5));

const coinCollection_test = new coinCollection([
    {
        year: 1899,
        denomination: '1$',
        current_price: '99$'
    },
    {
        year: 900,
        denomination: '1₴',
        current_price: 'priceless'
    },
    {
        year: 1999,
        denomination: '10€',
        current_price: '458$'
    },
    {
        year: 1200,
        denomination: '1zł',
        current_price: '1488$'
    }
]);


coinCollection_test.addCoin({
    year: 1575,
    denomination: '2kr',
    current_price: '1324$'
});

console.log(coinCollection_test.checkAllCoins());

