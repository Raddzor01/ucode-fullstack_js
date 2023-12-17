import fs from 'fs';
import { FormattedDate } from "./date.js";

export class NotePad {
    constructor() {
        this.list = [];
        const data = fs.readFileSync('Note.js', 'utf-8');
        this.note = JSON.parse(data ? data : '{}');
        for(let key in this.note) {
            this.list.push([key, this.note[key]]);
        }
    }

    add(note) {
        try {
            this.note[Date.now()] = {
                "name": note.filename,
                "text": note.content,
                "date": (new FormattedDate(Date.now())).getDate(),
                "importance": note.importance};
            fs.writeFile('Note.js', JSON.stringify(this.note), (err) => {
                if (err)
                    console.log(err);
            })

        } catch (err) {
            console.error(err)
        }
    }

    getList() {
        return this.list;
    }

    get(id) {
        return (new Map(this.list)).get(id);
    }

    delete(id) {
        delete this.note[id];
        try {
            fs.writeFile('Note.js', JSON.stringify(this.note), (err) => {
                if (err)
                    console.log(err);
            })
        } catch (err) {
            console.error(err)
        }
    }

    getNote(id) {
        let item = this.get(id);
        let result = `<h2>Detail of "${item.name}"</h2>`;
        result += `<ul><li>date: <b>${(new FormattedDate(item.date)).getDate()}</b></li>`;
        result += `<li>name: <b>${item.name}</b></li>`;
        result += `<li>importance: <b>${item.importance}</b></li>`;
        result += `<li>text: <b>${item.text}</b></li></ul>`;
        return result;
    }

}