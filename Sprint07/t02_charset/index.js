import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import iconv from 'iconv-lite';
import { TemplateEngine } from 'thymeleaf';

const port = process.env.PORT || 8080;
const app = express();

const templateEngine = new TemplateEngine();
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
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

app.get('/', (req, res) => {
    if (!req.body) {
        res.statusCode = 404;
        res.end('404 Not Found');
    }
    res.render('index');
});

app.post('/charset', (req, res) => {
    const text = req.body.text;
    let charset = req.body.selected;
    let newText;
    if (charset === 'utf8') {
        newText = text;
        charset = 'utf8';
    }
    else if (charset === 'Windows-1252') {
        newText = iconv.encode(iconv.decode(text, 'utf8'), 'cp1252').toString();
        charset = 'cp1252';
    }
    else if (charset === 'ISO-8859-1') {
        newText = iconv.encode(iconv.decode(text, 'utf8'), 'iso-8859-1').toString();
        charset = 'iso';
    }
    else
        throw new Error(`undefined this charset '${charset}'`);
    res.render('index', { input: text, [charset]: newText });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});