const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url).pathname;
    if (reqUrl === '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else if (reqUrl === '/script.js') {
        fs.readFile('script.js', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            return res.end();
        });
    }

}).listen(8080, () => {
    console.log(`Server running at port 8080`);
});
