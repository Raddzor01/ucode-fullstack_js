const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');
const NormalTime = require('./normal-router');
const QuantumTime = require('./quantum-router');
const ejs = require('ejs');

const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url).pathname;
    if (reqUrl === '/') {
        let html = await ejs.renderFile('./views/index.ejs', {}, null);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }

    if (reqUrl === '/normal') {
        let time = NormalTime.calculateTime();
        let timePrep = {
            years: time.years(),
            months: time.months(),
            days: time.days()
        }
        let html = await ejs.renderFile('./views/normal.ejs', {time: timePrep}, null);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }

    if (reqUrl === '/quantum') {
        let time = QuantumTime.calculateTime();
        let timePrep = {
            years: time[0],
            months: time[1],
            days: time[2]
        }
        let html = await ejs.renderFile('./views/quantum.ejs', {time: timePrep}, null);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }
}).listen(8080, () => {
    console.log(`Server started at port 8080`);
});