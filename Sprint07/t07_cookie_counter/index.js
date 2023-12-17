import express from 'express';
import cookieSession from 'cookie-session';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'session',
    keys: ["key1", "key2"],
    maxAge: 60000
}));

app.get('/', (req, res, next) => {
    req.session.views = (req.session.views || 0) + 1;
    res.end(`
    <h1>Cookie counter</h1>
    <p>This page was loaded ${req.session.views} time(s) in last minute`);
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});