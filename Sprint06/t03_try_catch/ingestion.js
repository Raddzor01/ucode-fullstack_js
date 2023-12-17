const {EatException} = require('./eat-exception');

class Ingestion {
    constructor(name, id) {
        this.meal_type = name;
        this.id = id;
        this.products = [];
        this.day_of_diet = 0;
    }

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(productName) {
        for (const productItem of this.products)
            if (productItem.name === productName)
                return productItem;
        return null;
    }

    getFromFridge(productName) {
        for (const productItem of this.products) {
            if (productItem.name === productName) {
                if (productItem.kcal_per_portion > 200) {
                    throw new EatException(`Too many calories in ${productItem.name} for ${this.meal_type}`);
                } else {
                    return productItem.name;
                }
            }
        }
    }
}

module.exports = {
    Ingestion: Ingestion
}