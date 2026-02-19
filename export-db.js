require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function exportUsers() {
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

    console.log('Fetching users to export...');
    const [rows] = await connection.execute('SELECT id, username, password, email, phone, created_at FROM users');

    if (rows.length === 0) {
        console.log('No users to export.');
    } else {
        const header = 'ID,Username,Password (Hashed),Email,Phone,Created At\n';
        const csv = rows.map(r => `${r.id},"${r.username}","${r.password}","${r.email || ''}","${r.phone || ''}",${r.created_at}`).join('\n');

        fs.writeFileSync('users_list.csv', header + csv);
        console.log('Successfully exported users to users_list.csv');
    }

    await connection.end();
}

exportUsers().catch(err => {
    console.error('Export error:', err);
    process.exit(1);
});
