var houseMixin = {
    wordReplace(searchStr, replaceStr) {
        this.description = this.description.replace(searchStr, replaceStr);
    },
    wordInsertAfter(searchStr, insertStr) {
        const splitStr = this.description.split(searchStr);
        this.description = splitStr.join(`${searchStr} ${insertStr}`);
    },
    wordDelete(searchStr) {
        const splitStr = this.description.split(searchStr);
        this.description = splitStr.join('');
    },
    wordEncrypt() {
        const output = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const input = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
        let encoded = '';
        for (let i=0; i < this.description.length; i++) {
            const index = input.indexOf(this.description[i]);
            if (index === -1) {
                encoded += this.description[i];
                continue;
            }
            encoded += output[index];
        }
        this.description = encoded;
    },
    wordDecrypt() {
        this.wordEncrypt();
    }
}

// const house = new HouseBuilder('88 Crescent Avenue',
//     'Spacious town house with wood flooring, 2-car garage, and a back patio.',
//     'J. Smith', 110, 5);

// Object.assign(house, houseMixin);

// console.log(house.getDaysToBuild());
// // 220
// console.log(house.description);
// // Spacious town house with wood flooring, 2-car garage, and a back patio.

// house.wordReplace("wood", "tile");
// console.log(house.description);
// // Spacious town house with tile flooring, 2-car garage, and a back patio.

// house.wordDelete("town ");
// console.log(house.description);
// // Spacious house with tile flooring, 2-car garage, and a back patio.

// house.wordInsertAfter("with", "marble");
// console.log(house.description);
// // Spacious house with marble tile flooring, 2-car garage, and a back patio.

// house.wordEncrypt();
// console.log(house.description);
// // Fcnpvbhf ubhfr jvgu zneoyr gvyr sybbevat, 2-pne tnentr, naq n onpx cngvb.

// house.wordDecrypt();
// console.log(house.description);
// // Spacious house with marble tile flooring, 2-car garage, and a back patio.
