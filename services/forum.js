const cookieParser = require("cookie-parser");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const utilService = require("../util/util")


const getDataForTopic = function(res,req,topic) {
    let q = "SELECT * FROM forum where topic = '" + topic+ "'"

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


const getTopicComments = function(res,req,idForum) {
    let q = "SELECT * FROM comments where idForum = '" + idForum+ "'"
    

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


const createTopic = function(res,req,data) {
    if (data.topicTitle == null || data.topicBody == null || data.topicOwner == null || data.topic == null || !utilService.isValidTopic(data.topic)) {
        res.status(400);
        res.send('BAD REQUEST');
        return
    }

    let q = "INSERT INTO forum (topicTitle,topicBody,topicOwner,topic) "+
    `VALUES ('${data.topicTitle}','${data.topicBody}','${data.topicOwner}','${data.topic}') `
    
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

const createComment = function(res,req,data) {
    if (data.commentBody == null || data.commentOwner == null || data.idForum == null || isNaN(data.idForum)) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    let q = "INSERT INTO forum (topicTitle,topicBody,topicOwner,topic) "+
    `VALUES ('${data.topicTitle}','${data.topicBody}','${data.topicOwner}','${data.topic}') `
    
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
    getDataForTopic,
    getTopicComments,
    createTopic,
    createComment
 };