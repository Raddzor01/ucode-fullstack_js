import express from 'express';
import session from 'express-session';
import csv from 'csv-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const port = process.env.PORT || 8080;
const app = express();
let thisSession;
let csvArray = [];

app.use(
    session({
        secret: 'its-secret',
        saveUninitialized: true,
        resave: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve() + '/'));
app.use('/', express.static(path.resolve()));
app.use(multer({ dest: 'uploads' }).single('file'));

app.get('/', (req, res) => {
    res.send(getIndex());
});

app.post('/', (req, res, next) => {
    thisSession = req.session;
    if (!req.file) {
        res.redirect('/');
    } else {
        thisSession.file = req.file.path;

        let result = '';
        fs.createReadStream(thisSession.file)
            .pipe(csv())
            .on('data', (data) => csvArray.push(data))
            .on('end', () => {
                result = renderTable(csvArray);
                res.send(getIndex(result));
            });
    }
});

app.get('/filter', (req, res) => {
    let result = '';
    fs.createReadStream(thisSession.file)
        .pipe(csv())
        .on('data', (data) => csvArray.push(data))
        .on('end', () => {
            result = renderTable(csvArray, req.query);
            res.send(getIndex(result));
        });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});

function getIndex(insert = false) {
    try {
        const data = fs.readFileSync('index.html', 'utf-8');
        if(data && insert)
            return data.replace('<div id="content"></div>', insert);
        else
            return data.replace('<div id="content"></div>', '');
    } catch (err) {
        console.error(err);
    }
    return false;
}

function renderTable(arr, filter = false) {
    let map = getFilters(arr);
    let res = '<form action="/filter" id="filters"><table><tr>';
    for (let key in arr[0]) {
        res += `<th>${getFilterHtml(key, map, filter ? filter[key] : false)}</th>`;
    }
    res += '</tr>';
    if (filter && Object.keys(filter).length !== 0) {
        arr = arr.filter(item => {
            let flag = true;
            for (let key in item) {
                if (!(filter[key] === item[key] || filter[key] === 'all-items')) {
                    flag = false;
                }
            }
            return flag;
        });
    }
    arr.map(item => {
        res += '<tr>';
        for (let key in item) {
            res += `<td>${item[key]}</td>`;
        }
        res += '</tr>';
    });
    res += '</table><button type="submit" id="submit"></button></form>';
    return res;
}

function getFilters(arr) {
    let map = new Map();
    for (let key in arr[0]) {
        map.set(key, [...new Set(arr.map(item => { return item[key]}))].sort());
    }
    return map;
}

function getFilterHtml(title, map, filter) {
    let res = `<select name="${title}">${title}`;
    res += `<option value="all-items" ${!filter || filter === 'all-items' ? 'selected' : ''}><b>${title} (all)</b></option>`;
    map.get(title).map(item => {
        res += `<option value="${item}"  ${filter === item ? 'selected' : ''}>${item}</option>`;
    });
    res += `</select>`;
    return res;
}