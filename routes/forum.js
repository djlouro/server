const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const forumService = require("../services/forum")
const utilService = require("../util/util")

Router.get("/:topic", (req,res) => {
    let topic = req.params.topic

    if (topic == null || !utilService.isValidTopic(topic)) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    forumService.getDataForTopic(res, req, topic)
});

Router.get("/comments/:idForum", (req,res) => {
    let idForum = req.params.idForum

    if (idForum == null || isNaN(idForum)) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    forumService.getTopicComments(res,req,idForum)
});


Router.post("/", (req,res) => {
    let data = req.body;

    if (data == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return
    }

    forumService.createTopic(res,req,data)
});

Router.post("/comment", (req,res) => {
    let data = req.body;

    if (data == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    forumService.createComment(res,req,data)   
});


module.exports = Router;