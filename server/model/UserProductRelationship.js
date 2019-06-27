const db = require('../database');

class UserProductRelationship {
    constructor(userId, productId) {
        this.userId = userId;
        this.productId = productId;
        Object.freeze(this);
    }

    async persist() {
        const query = `
        INSERT INTO user_product_relationship (user_id, product_id) VALUES
        ('${this.userId}', '${this.productId}');
        `

        try {
            const response = await db.query(query);
            console.log(response, 'response');

        } catch (error) {
            console.log(error, 'error');

        }
    }
}

module.exports.UserProductRelationship = UserProductRelationship;