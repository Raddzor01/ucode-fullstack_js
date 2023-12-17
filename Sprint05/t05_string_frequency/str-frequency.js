module.exports = class StrFrequency {
    constructor(string) {
        this.str = string;
    }
    letterFrequencies() {

        let tempString = this.str.toUpperCase();
        const frequencies = {};

        for (const char of tempString)
            if (/[A-Z]/.test(char))
                frequencies[char] = (frequencies[char] || 0) + 1;

        return frequencies;
    }
    wordFrequencies() {

        if (this.str === '')
            return { '': 1 };

        let wordsArray = this.str.toUpperCase().split(/[0-9]*[ '--,!]/).filter((val) => val !== '');
        const frequencies = {};

        if(wordsArray)
            for (const word of wordsArray)
                frequencies[word] = (frequencies[word] || 0) + 1;

        return frequencies;
    }
    reverseString() {
        return this.str.split('').reverse().join('');
    }
}