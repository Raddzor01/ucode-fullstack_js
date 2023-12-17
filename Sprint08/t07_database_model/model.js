const db = require('./db.js')

module.exports = class Model {
    constructor(name, description, class_role, race_id) {
        this.id = 0;
        this.name = name;
        this.description = description;
        this.class_role = class_role;
        this.race_id = race_id;
    }

    find(id) {
        db.query('SELECT * FROM heroes WHERE id=?;', id, (err, rows) => {
            if (err) {
                console.log(`Error: ${err}`);
                return;
            }
            this.id = rows[0].id;
            this.name = rows[0].name;
            this.description = rows[0].description;
            this.class_role = rows[0].class_role;
            this.race_id = rows[0].race_id;

            console.log(`Hero was with id ${this.id} found:`)
            console.log({
                name: this.name,
                id: this.id,
                description: this.description,
                class_role: this.class_role,
                race: this.race_id
            });
        });
    }

    delete(id) {
        db.query('DELETE FROM heroes WHERE id = ?;', id, (err, res) => {
            if (err)
                console.log(`Error: ${err}`);
            else
                console.log('Successful delete hero');
        });
    }

    save() {
        let hero = {
            name: this.name,
            description: this.description,
            class_role: this.class_role,
            race_id: this.race_id
        }
        db.query('INSERT INTO heroes SET ?', hero, (err, rows) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                this.id = rows.insertId;
                console.log(`Successful save hero ${this.name}.`);
            }
        })
    }
}
