import express from 'express';
import session from 'express-session';
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve()));
app.use(session({
    secret: 'its-secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    const thisSession = req.session;
    if (thisSession.name) {
        res.redirect('/user');
    } else {
        res.sendFile('index.html');
    }
});

app.post("/", (req, res) => {
    const thisSession = req.session;
    let resultExperience = 1;

    for (const key in req.body) {
        if (key.includes("power_")) {
            thisSession.experience = resultExperience++;
        } else {
            thisSession[key] = req.body[key];
        }
    }

    res.redirect("/user");
});

app.get("/user", (req, res) => {
    const thisSession = req.session;
    if (thisSession.name && thisSession.alias && thisSession.age && thisSession.description && thisSession.photo && thisSession.level && thisSession.purpose) {
        res.send(`
            <h1>Session for new</h1>
            <pre>
            name: ${thisSession.name}
            alias: ${thisSession.alias}
            age: ${thisSession.age}
            description: ${thisSession.description}
            photo: ${thisSession.photo}
            experience: ${thisSession.experience}
            level: ${thisSession.level}
            purpose: ${thisSession.purpose}
            </pre>
            <button><a href='/logout'>Forget</a></button>
        `);
    } else {
        res.send('<h1>Please login first.</h1><a href="/">Login</a>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});
