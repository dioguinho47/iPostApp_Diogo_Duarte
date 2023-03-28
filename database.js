const {Client} = require('pg');

const client = new Client ({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "diogoduarte",
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PW || "mydatabase123",
    database: process.env.DB_DB || "ipostapplication",
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = client;