const express = require('express');
const router = express.Router();
const { db } = require('../services/db');

router.post('/createSession', (req, res) => {
    console.log('Creating session');
    const data = req.body;
    try {
        db.query(`INSERT INTO AppSession(sessionId,result) VALUES(?,?)`, [data.id, data.result], (err, result, fields) => {
            if (err) {
                return res.status(400).json({ err: true, msg: 'Session not created', desc: err });
            } else {
                return res.status(200).json({ err: false, msg: 'Session created' });
            }
        });
    } catch (err) {
        console.log('Error creating session', err);
        return res.status(500).json({ err: true, msg: 'Session not created', desc: err });
    }
});

router.post('/execsql', (req, res) => {
    console.log('Executing SQL query...');
    const data = req.body;
    try {
        db.query(data['query'], (err, result, fields) => {
            if (err) {
                return res.status(400).json({ err: true, msg: 'Query Execution failed', desc: err });
            } else {
                db.query(`UPDATE AppSession SET result=? WHERE sessionId=?`, [JSON.stringify(result), data.id]);
                return res.status(200).json({ err: false, msg: 'Query executed', result });
            }
        });

    } catch (err) {
        console.log('DB Error', err);
        return res.status(500).json({ err: true, msg: 'Server Error', desc: err });
    }
});

module.exports = router;