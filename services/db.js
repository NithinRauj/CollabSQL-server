const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql1712',
    database: 'collabsql'
});

const initDBConnection = () => {
    db.connect();
}

const clearSessionsData = () => {
    db.query('DELETE FROM AppSession', (err, result, fields) => {
        if (err) {
            console.log("Error clearing sessions data");
        } else {
            console.log("Cleared sessions data");
        }
    })
}

module.exports = {
    db, initDBConnection, clearSessionsData
};