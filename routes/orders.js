const cookieParser = require("cookie-parser");
const e = require("express");
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const orderService = require("../services/orders")
const utilService = require("../util/util")

const isValidCondition = function(contition) {
    return ["repair", "avalible", "taken"].includes(contition)
}


Router.get("/", (req,res) => {  
    let group = utilService.getGroupFromCookie(req)
    
    if (group == null || group != 'ADMIN') {
        res.status(400);
        res.send('NOT ALLOWED');
    }

    orderService.getOrders(res, req)
});

async function getMooringID(req, res)  {
    let q = ""
    let data = req.body;
    let code = data.code
    q = "select id from mooring where code = '" + code + "'"
    await mysqlConnection.query(q, (err, rows, fields) => {
        if (!err) {
            return(rows[0].i);
        }
        else {
            return null
        }
    }) 
}

Router.post("/", async (req,res) => {
    let data = req.body;
   
    if (data == null || data.id == null) {
        res.status(400);
        res.send('BAD REQUEST');
    }

    orderService.createOrder(res,req,data)
       
});

Router.put("/:action", (req,res) => {
    let action = req.params.action;
    let data = req.body;

    if (action == null || data == null) {
        res.status(400);
        res.send('BAD REQUEST');
        return;
    }

    orderService.proccessOrder(res,req,action,data)
});

module.exports = Router;