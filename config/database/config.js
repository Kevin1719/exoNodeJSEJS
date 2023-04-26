const mysql = require('mysql2');
require('dotenv').config();
/* creation d'une sql de connexion */
const sql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/*Savoir si la connection a été établie */
sql.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = sql;