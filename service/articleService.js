const sql = require('../config/database/config');

exports.getAllArticle = async () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM article`, (err, rows) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    resolve(rows);
                }
            });
    });
};

exports.getArticleById = async (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM article where id=?`,[id], (err, rows) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    resolve(rows);
                }
            });
    });
};

exports.addArticle = async (body) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO article (title,content,articleDate) VALUES (?,?,?);`,
            [body.title, body.content, body.articleDate], (err, rows) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    resolve(rows);
                }
            });
    });
};

exports.updateArticle = (body) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE article SET  title = ?, content = ?, articleDate = ? WHERE id = ?`,
        [body.title, body.content, body.articleDate, body.id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

exports.deleteArticle = async (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`DELETE FROM article WHERE id=?`, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    resolve(rows);
                }
            });
    });
};