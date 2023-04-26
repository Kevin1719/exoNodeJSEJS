const sql = require('../config/database/config');

exports.register = (body) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO users (name,mail,password,confirmPassword) VALUES (?,?,?,?);`,
         [body.name, body.mail, body.password, body.confirmPassword], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getUserByMail = (mail) => {
    return new Promise((resolve, reject) => {
        sql.query('SELECT * FROM users WHERE mail=?', [mail], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
