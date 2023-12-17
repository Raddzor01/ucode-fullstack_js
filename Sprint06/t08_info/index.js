const process = require('node:process');
const os = require('os');
const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');
const querystring = require('node:querystring');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url).pathname;
    if (reqUrl === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        console.log(`Name of the executed script: `);
        console.log(process.argv[1].split(`\\`).pop());

        console.log(`Arguments passed to the script:`);
        process.argv.forEach((arg, index) => {
            console.log(`${arg.split(`\\`).pop()}`);
        });

        console.log(`IP addresses:`);
        const networkInterfaces = os.networkInterfaces();
        for (const interfaceName in networkInterfaces) {
            const iface = networkInterfaces[interfaceName];

            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];

                if (alias.family === 'IPv4' && !alias.internal && alias.address !== '127.0.0.1') {
                    console.log(`${alias.address}`);
                }
            }
        }
        console.log(`Host name: `);
        console.log(req.headers.host);
        console.log(`Information protocol: `);
        console.log(`HTTP ` + req.httpVersion);
        console.log(`Query method: `);
        console.log(req.method);
        console.log(`User agent: `);
        console.log(req.headers[`user-agent`]);
        console.log(`Client IP address: `);
        console.log(req.socket.remoteAddress);
        console.log(`URL parameters: `);
        console.log(url.parse(req.url).search);
    }


}).listen(8080, () => {
    console.log(`Server started at port 8080`);
});