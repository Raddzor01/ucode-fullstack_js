import express from 'express';
import session from 'express-session';
import path from "path";
import { ListAvengerQuotes } from './ListAvengerQuotes.js';
import { data } from './array.js';

const port = process.env.PORT || 8080;
const app = express();

app.use("/", express.static(path.resolve()));
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'its-secret',
        resave: false,
        saveUninitialized: true,
    })
);
app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.get('/XML', (req, res) => {
    const list = new ListAvengerQuotes(data);
    res.json({
        to: list.toXML(),
        from: list.fromXML()
    });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});