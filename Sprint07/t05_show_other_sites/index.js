import express from 'express';
import fs from 'fs';
import request from 'request';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, response) => {
    if (req.query.url) {
        fetchUrl(req.query.url, (body) => {
            response.send(getIndex('<hr>url: ' + req.query.url + '<br><hr><pre>' + body + '</pre>'));
        });
    } else {
        response.send(getIndex('<div id="typeurl">Type an URL...</div>'));
    }
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});

function fetchUrl(url, callback) {
    const fullUrl = url.includes('http') ? url : 'http://' + url;
    request(fullUrl, (error, res, body) => {
        if (!error && res.statusCode === 200) {
            callback(body.substring(body.indexOf('<body'), body.indexOf('</body') + 7).replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        } else {
            callback('');
        }
    });
}

function getIndex(insert = '') {
    try {
        let data = fs.readFileSync('index.html', 'utf-8');
        data = data.replace('<div id="text"></div>', insert);
        return data;
    } catch (err) {
        console.log(err);
        return '';
    }
}
