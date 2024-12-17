const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",        // MySQL server is running locally
    user: "root",             // Your MySQL Workbench username
    password: "123456", // Replace with your MySQL Workbench password
    database: "employeemanagement", // Replace with the name of your database
    port: 3306                // Default MySQL port
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db;
