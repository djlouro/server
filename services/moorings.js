const cookieParser = require("cookie-parser");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const utilService = require("../util/util")


const getMooringsForAdmin = function(res,req) {
    let q = ""
    let conditionM = req.query.conditionM;

    if (conditionM) {
        if (!utilService.isValidCondition(conditionM)) {
            res.status(400);
            res.send('BAD REQUEST');
        }
        q = "SELECT * FROM mooring where conditionM = '" + conditionM+ "'"
    } else {
        q = "SELECT * FROM mooring"
    }

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


const getMooringsForUser = function(res,req) {
    let q = ""

    q = "SELECT code, id, width, length, price FROM mooring "+
    "WHERE conditionM = 'avalible'"

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        }
        else {
            res.status(500);
            res.send(err);
        }
    })
}


const getMooringInfoForUser = function(res,req) {
    let q = ""
    let username = req.query.client

    if (username == null) {
        res.status(400);
        res.send('NOT ALLOWED');
    }

    q = "SELECT * FROM mooring "+
    "WHERE client = '"+username+"'"

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

const updateMooring = function(res, req, data) {
    let q = "";

    if (data.code == null || data.conditionM == null || data.id == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    q = "UPDATE mooring "+
    `SET code='${data.code}',width='${data.width}',length='${data.length}',watherDepth='${data.watherDepth}',type='${data.type}',price=${data.price},conditionM='${data.conditionM}',client='${data.client}',lat=${data.lat},lng=${data.lng},note='${data.note}' `+
    `WHERE id=${data.id}`

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

const createMooring = function(res, req, data) {
    let q = "";

    if (data.code == null || data.conditionM == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    q = "INSERT INTO mooring (code,width,length,watherDepth,type,price,conditionM,client,lat,lng,note)"+
    `VALUES ('${data.code}','${data.width}','${data.length}','${data.watherDepth}','${data.type}',${data.price},'${data.conditionM}','${data.client}',${data.lat},${data.lng},'${data.note}' )`


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

const deleteMooring = function(res, req, id) {
    let q = "DELETE FROM mooring "+
    `WHERE id=${id}`


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
    getMooringsForAdmin,
    getMooringsForUser,
    getMooringInfoForUser,
    deleteMooring,
    updateMooring,
    createMooring
 };