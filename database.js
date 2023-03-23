const {Client} = require('pg');

const client = new Client ({
    host: "localhost",
    user: "diogoduarte",
    port: 5432,
    password: "mydatabase123",
    database: "ipostapplication"
})

module.exports = client;