const uuidV4 = require('uuidv4');
const db = require('../database');

class Product {
    constructor(asin, country) {
        this.id = uuidV4();
        this.asin = asin;
        this.countryCode = country;
        Object.freeze(this);
    }

    async persist() {
        const query = `
        INSERT INTO products (id, asin, country_code) VALUES
        ('${this.id}','${this.asin}', '${this.countryCode}');
        `

        try {
            const response = await db.query(query);
            console.log(response, 'response');

        } catch (error) {
            console.log(error, 'error');

        }
    }
}

module.exports.Product = Product;
