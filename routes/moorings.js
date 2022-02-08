const cookieParser = require("cookie-parser");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const mooringService = require("../services/moorings")
const utilService = require("../util/util")


Router.get("/", (req,res) => {
    let group = utilService.getGroupFromCookie(req)

    if (group == null) {
        res.status(400);
        res.send('NOT ALLOWED');
    }

    if (group == "USER") {
        if (req.query.client){
            mooringService.getMooringInfoForUser(res,req)
        } else {
            mooringService. getMooringsForUser(res,req)
        }
    } else if (group == "ADMIN") {
        mooringService.getMooringsForAdmin(res,req)   
    } else {
        res.status(400);
        res.send('NOT ALLOWED');
    }
});

Router.post("/", (req,res) => {
    let data = req.body;

    if (data == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    mooringService.createMooring(res, req, data);    
});

Router.put("/", (req,res) => {
    let data = req.body;

    if (data == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    mooringService.updateMooring(res, req, data);
});

Router.delete("/:id", (req,res) => {
    let id = req.params.id;

    if (id == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    mooringService.deleteMooring(res, req, id);
});

module.exports = Router;