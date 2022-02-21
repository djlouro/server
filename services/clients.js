const cookieParser = require("cookie-parser");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const utilService = require("../util/util");


const getClients = function(res,req) {
    let q = "select * from Clients"

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500);
            res.send(err);
        }
    })
}

const getClient = function(res,req,username) {
    let q = "select * from Clients " +
    `WHERE username='${username}'`
    
    console.log(q)

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500);
            res.send(err);
        }
    })
}

const updateClient = function(res,req,data) {
    let q = ""

    if (data.username == null) {
        res.status(400);
        res.send('UNKNOWN CLIENT');
    }

    q = "UPDATE Clients "+
    `SET fullName='${data.fullName}',address='${data.address}',zip='${data.zip}',country='${data.country}',note='${data.note}' `+
    `WHERE username='${data.username}'`

    console.log(q)
    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500);
            res.send(err);
        }
    }) 
}

const createClient = function(res,req,username) {
    let q = ""

    if (username == null) {
        res.status(400);
        res.send('UNKNOWN CLIENT');
    }

    q = "INSERT INTO Clients (username)"+
        `VALUES ('${username}')`;

    console.log(q)

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500);
            res.send(err);
        }
    })
}


module.exports = { 
    Router,
    getClients,
    updateClient,
    createClient,
    getClient
 };