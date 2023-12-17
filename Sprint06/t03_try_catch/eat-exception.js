class EatException extends Error {
    constructor(typeError = "No more junk food, dumpling") {
        super(typeError);
        this.name = "EatException";
    }
}

module.exports = {
    EatException: EatException
}