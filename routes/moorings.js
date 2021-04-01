const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req,res) => {
    let q = ""
    let conditionM = req.query.conditionM;

    console.log(conditionM);
    if (conditionM) {
        q = "SELECT * FROM mooring where conditionM = '" + conditionM+ "'"
    } else {
        q = "SELECT * FROM mooring"
    }

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

Router.post("/", (req,res) => {
    let q = ""
    console.log(req.body);
    let data = req.body;

    q = "INSERT INTO mooring (code,width,length,watherDepth,type,price,conditionM,client,lat,lng)"+
    `VALUES ('${data.code}','${data.width}','${data.length}','${data.watherDepth}','${data.type}',${data.price},'${data.conditionM}','${data.client}',${data.lat},${data.lng} )`

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })      
});

Router.put("/", (req,res) => {
    let q = ""
    console.log(req.body);
    let data = req.body;

    q = "UPDATE mooring "+
    `SET code='${data.code}',width='${data.width}',length='${data.length}',watherDepth='${data.watherDepth}',type='${data.type}',price=${data.price},conditionM='${data.conditionM}',client='${data.client}',lat=${data.lat},lng=${data.lng} `+
    `WHERE id=${data.id}`

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })   
});

Router.delete("/:id", (req,res) => {
    console.log("DELETE")
    let q = ""
    let id = req.params.id;
    console.log(id)
    q = "DELETE FROM mooring "+
    `WHERE id=${id}`

    console.log(q)

    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })   
});

module.exports = Router;