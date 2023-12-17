const Anon = class {

    #name;
    #alias;
    #affiliation;
    constructor(name, alias, affiliation) {
        this.#name = name;
        this.#alias = alias;
        this.#affiliation = affiliation;
    }

    get name() {
        return this.#name;
    }

    get alias() {
        return this.#alias;
    }

    get affiliation() {
        return this.#affiliation;
    }
}

module.exports.getAnonymous = (name, alias, affiliation) => {
    return new Anon(name, alias, affiliation);
}