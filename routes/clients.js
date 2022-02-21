const cookieParser = require("cookie-parser");
const e = require("express");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const clientService = require("../services/clients")
const utilService = require("../util/util")


Router.get("/", (req,res) => {  
    let group = utilService.getGroupFromCookie(req)
    
    if (group == null || group != 'ADMIN') {
        res.status(400);
        res.send('NOT ALLOWED');
    }


    console.log(11111111111)
    clientService.getClients(res, req)
});

Router.get("/mooring/:username", (req,res) => {  
    console.log(666666)
    let group = utilService.getGroupFromCookie(req)
    let username = req.params.username;
    console.log(99999999)
    if (group == null || group != 'ADMIN') {
        res.status(400);
        res.send('NOT ALLOWED');
    }

    if (username == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    clientService.getClient(res, req, username)
});

Router.put("/", (req,res) => {
    let data = req.body;
    let group = utilService.getGroupFromCookie(req)

    if (group == null || group != 'ADMIN') {
        res.status(400);
        res.send('NOT ALLOWED');
    }

    if (data == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    clientService.updateClient(res, req, data);  
});

Router.post("/", (req,res) => {
    let username = req.query.username;
    
    console.log(8)
    console.log(username)
    if (username == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    clientService.createClient(res, req, username);  
});

module.exports = Router;