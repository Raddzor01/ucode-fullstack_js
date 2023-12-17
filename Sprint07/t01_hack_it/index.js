import express from 'express';
import session from 'express-session';
import {passwordCheck, hashPassword} from "./hash.js";
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();
let thisSession;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve()));
app.use(session({
    secret: 'its-secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    thisSession = req.session;
    if(thisSession.name) {
        res.redirect('/user');
        return;
    }
    res.sendFile('index.html');
});

app.post("/", (req, res) => {
    thisSession = req.session;
    const { password, salt } = req.body;
    thisSession.hash = hashPassword(password, salt);
    res.send(`<h1>Password</h1>
    <form action="/check" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${thisSession.hash}</p>
    <p>Try to guess:<input type="text" name="password" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
    `);
});

app.post("/check", (req, res) => {
    thisSession = req.session;
    if(passwordCheck(req.body.password, thisSession.hash))
        res.send(`<h1>Password</h1>
    <h2 style="color:green">Hacked!</h2>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>
    `);
    else
        res.send(`<h1>Password</h1>
    <h2 style="color:red">Access denied!</h2>
    <form action="/check" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${thisSession.hash}</p>
    <p>Try to guess:<input type="text" name="text" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
    `);
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) { return console.log(err); }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});