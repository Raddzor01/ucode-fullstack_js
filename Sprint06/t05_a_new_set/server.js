const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');
var queryString = require('node:querystring');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url).pathname;
    if (reqUrl === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            if (req.method === 'POST') {

                let chunks = '';
                let post = null;

                let html = data.toString();
                let marker = '<div id="array">';
                let start = html.indexOf(marker) + marker.length;

                req.on('data', chunk => {
                    chunks += chunk;
                });

                req.on('end', () => {
                    post = queryString.parse(chunks);
                    let insert = `POST
<pre>
Array
[
    [name] => ${post.name}
    [email] => ${post.email}
    [age] => ${post.age}
    [about] => ${post.about}
    [photo] => ${post.photo}
]
</pre>`;
                    res.write(html.slice(0, start) + insert + html.slice(start, html.length));
                    return res.end();
                });
            } else {
                res.write(data);
                return res.end();
            }
        });
    }
    if (reqUrl === '/style.css') {
        fs.readFile('style.css', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            return res.end();
        });
    }


}).listen(8080, () => {
    console.log(`Server running at port 8080`);
});


