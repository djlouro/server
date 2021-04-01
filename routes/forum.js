const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/:topic", (req,res) => {
    let q = ""
    let topic = req.params.topic

    console.log(topic);
    if (topic) {
        q = "SELECT * FROM forum where topic = '" + topic+ "'"
    } else {
        q = "SELECT * FROM forum"
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
Router.get("/comments/:idForum", (req,res) => {
    let q = ""
    let idForum = req.params.idForum

    console.log(idForum);
    if (idForum) {
        q = "SELECT * FROM comments where idForum = '" + idForum+ "'"
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

    q = "INSERT INTO forum (topicTitle,topicBody,topicOwner,topic) "+
    `VALUES ('${data.topicTitle}','${data.topicBody}','${data.topicOwner}','${data.topic}') `
    mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })      
});
Router.post("/comment", (req,res) => {
    let q = ""
    console.log(req.body);
    let data = req.body;

    q = "INSERT INTO comments (commentBody,commentOwner,idForum) "+
    `VALUES ('${data.commentBody}','${data.commentOwner}','${data.idForum}') `
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