const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "manager",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
        console.log("Server running on port 3000");
    }
    else {
        console.log("Connection failed");
    }
})

 module.exports = mysqlConnection