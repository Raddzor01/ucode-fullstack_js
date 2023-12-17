import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';
import path from 'path';

const app = express();

const publicKey = '38cf70b615047fa4264e8416be5d8cd5';
const privateKey = '6127ff0294401622234651242a9cb12601338f58';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.resolve()));

app.get('/', async (req, res) => {
    res.sendFile('/index.html');
});

app.get('/show', async (req, res) => {
    let now = Date.now();
    let hash = crypto.createHash('md5').update(now + privateKey + publicKey).digest('hex');
    res.json(await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&hash=${hash}&ts=` + now)
        .then(res => res.json()));
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started at http://127.0.0.1:${process.env.PORT || 8080}`);
});