const mysql = require('mysql');
let config = require('./config.json');

const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
});

connection.connect((err) => {
   if(err)
       console.log(`Error ${err.message}`);
   else
       console.log(`Connection with database ${config.database} successfully established`);
});

connection.query('SELECT * FROM heroes', (err, res) => {
    if (err)
        console.log(err);
    else
        console.log(res);
});

connection.end((err) => {
    if (err)
        console.log(`Error ${err.message}`);
    else
        console.log('Connection closed');
});