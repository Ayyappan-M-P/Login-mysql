const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "bvhelhn3c2jfybtsmsbg-mysql.services.clever-cloud.com",
    user: "uafsqmkh7w1usio0",
    password: "qfSF90zQNF34ExRKeFup",
    database: "bvhelhn3c2jfybtsmsbg",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db;