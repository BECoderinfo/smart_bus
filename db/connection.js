const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'zdkWNjwuisPrV3d.root',
    password: 'aSHbor0iiaxunbTY',
    database: 'test',
    ssl: {
        rejectUnauthorized: true
    },
    connectTimeout: 40000 // Increase the timeout (in milliseconds)
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

connection.on('error', (err) => {
    console.error(err);
});

module.exports = connection;
