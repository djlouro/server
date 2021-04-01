const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const MooringsRoutes = require("./routes/moorings");
const ForumRoutes = require("./routes/forum");
var cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(cors())

app.use("/moorings", MooringsRoutes);
app.use("/forum", ForumRoutes);

app.listen(3000);