const cookieParser = require("cookie-parser");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const utilService = require("../util/util")


const getOrders = function(res,req) {
    let q = "select username, status, email, code, price from orders"+
    " join mooring on orders.MooringID = mooring.id"

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


const createOrder = function(res,req,data) {
    let q = ""
    let email = utilService.getEmailFromCookie(req)
    let username = utilService.getUsernameFromCookie(req)
    let mooringID = data.id 
   
    if (email == null || username == null || mooringID == null) {
        res.status(400);           
        res.send('BAD REQUEST');
        return;
    }
        
    q = "INSERT INTO orders (MooringID,username,email,status) "+
    `VALUES ('${mooringID}','${username}','${email}','pending')`

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


const proccessOrder = function(res,req,action,data) {
    let q = ""

    let username = data.username;
    let code = data.code;

    if (username == null || code == null || action == null || !utilService.isValidAction(action)) {
        res.status(400);           
        res.send('BAD REQUEST');
        return;
    }

    let status = action == "accept" ? "accepted" : "declined"


    if (status == "accepted") {
        q = "start TRANSACTION;"+

        "UPDATE orders o "+
        "SET o.status = '"+ status +"' "+
        "WHERE o.username = '"+ username +"' and o.MooringID = (SELECT id FROM mooring where code='"+code+"'); "+
        
        "UPDATE mooring mo "+
        "SET mo.client = '"+username+"', mo.conditionM = 'taken'"+
        "WHERE mo.code = '"+code+"';"+
        
        "COMMIT;"
    } else {
        q = "UPDATE orders o "+
        "SET o.status = '"+ status +"' "+
        "WHERE o.username = '"+ username +"' and o.MooringID = (SELECT id FROM mooring where code='"+code+"')"
    }


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
    getOrders,
    createOrder,
    proccessOrder
 };