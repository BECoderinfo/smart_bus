const express = require('express');
const db = require('../db/connection');
var jwt = require('jsonwebtoken');

const SignUp = (req, res) => {
    const { uid, number, password, type } = req.body;

    if (uid.length !== 10) {
        return res.status(400).send({ message: 'Invalid uid. Uid must be 10 characters long' });
    } else if (number.length !== 12 && number.length !== 10) {
        return res.status(400).send({ message: 'Invalid number. Number must be 10 characters long' });
    } else if (password.length !== 8) {
        return res.status(400).send({ message: 'Password must be 8 characters long' });
    }
    var header;

    if(type === "admin"){
        header = '7' + Math.random().toString(36).slice(-5);
    }else if(type === "driver"){
        header = '5' + Math.random().toString(36).slice(-5);
    }else if(type === "attender"){
        header = '6' + Math.random().toString(36).slice(-5);
    }else{
        header = '4' + Math.random().toString(36).slice(-5);
    }
    const DNC = "000000";
    const CRC = "DONE";
    const formattedNumber = "00" + number;

    const checkQuery = 'SELECT * FROM login WHERE uid = ? OR number = ?';
    const checkData = [uid, formattedNumber];

    db.query(checkQuery, checkData, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error checking data' });
        } else if (results.length > 0) {
            res.status(409).send({ message: type +' already exists on that number or uid' });
        } else {
            const query = 'INSERT INTO login SET ?';
            const data = { header, uid, number: formattedNumber, password, DNC, CRC };

            db.query(query, data, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Error inserting data' });
                } else {
                    res.send({ message: type + ' created successfully' });
                }
            });
        }
    });
};

const login = (req, res) => {
    var { uid, password } = req.body;

    const query = 'SELECT * FROM login WHERE uid = ? AND password = ?';
    const data = [uid, password];

    db.query(query, data, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error logging in' });
        } else if (results.length === 0) {
            console.log(results);
            res.status(401).send({ message: 'Invalid credentials' });
        } else {
            results[0].password = "********";
            // const token = jwt.sign({ results }, 'secretkey');
            // res.status(200).send( {message: 'Login successful', token , results});
            res.status(200).send({ message: 'Login successful', results });
        }
    });
};

module.exports = { SignUp , login };    