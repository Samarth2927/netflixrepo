require('dotenv').config();
const mysql = require('mysql2/promise');

async function viewUsers() {
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

    console.log('Connected to Aiven MySQL. Fetching user details...');

    // Selecting all columns including password as requested
    const [rows] = await connection.execute('SELECT id, username, password, email, phone, created_at FROM users');

    if (rows.length === 0) {
        console.log('No users found in the database.');
    } else {
        console.table(rows);
    }

    await connection.end();
}

viewUsers().catch(err => {
    console.error('Error fetching users:', err);
    process.exit(1);
});
