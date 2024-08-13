const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'dpg-cqtljm8gph6c739t312g-a',
    user: 'bus',
    password: 'ARiF2Gt3wy931nJNQmzYVBZkET5JPbzZ',
    database: 'smart_bus'
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
