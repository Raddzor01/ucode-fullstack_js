const mysql = require('mysql2');
const db = require('./config.json');

class Model {
    connection;
    constructor(table) {
        this.table = table;
    }

    async save(data) {
        let keys = [];
        let values = [];
        let update = [];
        let query;
        for(let key in data) {
            if(key !== "id") {
                keys.push(key);
                values.push(`'${data[key]}'`);
                update.push(`${key}='${data[key]}'`);
            }
        }
        if(data.id) {

            query = `UPDATE ${this.table} SET ${update} WHERE id=${data.id};`;
        } else {
            query = `INSERT ${this.table} (${keys}) VALUES (${values});`;
        }
        let [rows,fields] = await this._connect(query);

        return this;
    }

    async getList(data) {
        let keys = [];
        let values = [];
        let where = [];
        for(let key in data) {
            if(key !== "id") {
                keys.push(key);
                values.push(`'${data[key]}'`);
                where.push(`${key}='${data[key]}'`);
            }
        }

        let query = `SELECT * FROM ${this.table} WHERE ${where.join(" AND ")};`;
        let [rows,fields] = await this._connect(query);
        return rows;
    }
    _connect(query) {
        this.connection = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database
        });
        this.connection.connect();
        let result;
        try {
            result = this.connection.promise().query(query);
        } catch (err) {
            result = err;
            console.error(err)
        }
        this.connection.end();
        return result;
    }
}

module.exports = Model;