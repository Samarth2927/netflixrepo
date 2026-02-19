require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    });

    console.log('Connected to Aiven MySQL');

    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const queries = schema.split(';').filter(query => query.trim() !== '');

    for (const query of queries) {
        await connection.query(query);
        console.log('Executed query:', query.trim().substring(0, 50) + '...');
    }

    await connection.end();
    console.log('Database setup complete');
}

setupDatabase().catch(err => {
    console.error('Error setting up database:', err);
    process.exit(1);
});
