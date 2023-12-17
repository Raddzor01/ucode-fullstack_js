import express from 'express';
import fs from 'fs';
import { NotePad } from "./NotePad.js";
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.resolve()));

app.get('/', (req, res) => {
    res.send(getIndex());
});

app.post('/', (req, res) => {
    (new NotePad()).add(req.body);
    res.redirect('/');
});

app.get('/list', (req, res) => {
    res.json({
        list: (new NotePad()).getList()
    });
});

app.get('/show', (req, res) => {
    res.send(getIndex(((new NotePad()).getNote(req.query.id))));
});

app.get('/delete', (req, res) => {
    (new NotePad()).delete(req.query.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});

function getIndex(insert = false) {
    try {
        const data = fs.readFileSync('index.html', 'utf-8');
        if(data && insert)
            return data.replace("<div class=\"container\" id=\"content\"></div>", insert);
        else
            return data.replace("<div class=\"container\" id=\"content\"></div>", '');
    } catch (err) {
        console.error(err)
    }
    return false;
}