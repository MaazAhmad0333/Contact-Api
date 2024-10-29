const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cybersecurity%%091',
    database: 'first_project'
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected');
    connection.release(); // Release the connection back to the pool
});

module.exports = {db};



