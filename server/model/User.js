const uuidV4 = require('uuidv4');
const db = require('../database');

class User {
    constructor(email) {
        this.id = uuidV4();
        this.email = email;
        Object.freeze(this);
    }

    async persist() {
        const query = `
        INSERT INTO users (id, email) VALUES
        ('${this.id}', '${this.email}');
        `

        try {
            const response = await db.query(query);
            console.log(response, 'response');

        } catch (error) {
            console.log(error, 'error');

        }
    }
}

module.exports.User = User;