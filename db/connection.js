const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql106.ezyro.com',
    user: 'ezyro_37076995',
    password: '',
    database: 'ezyro_37076995_smart_bus'
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