const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const MooringsRoutes = require("./routes/moorings");
const OrdersRoutes = require("./routes/orders");
const ForumRoutes = require("./routes/forum");
const authFilter = require("./filter/authFilter")
var cors = require('cors')
const cookieParser = require("cookie-parser");


const corsConfig = {
    origin: true,
    credentials: true,
  };

var app = express();
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

//app.use(cors())
app.use(authFilter.authChecker);

app.use("/moorings", MooringsRoutes);
app.use("/orders", OrdersRoutes);
app.use("/forum", ForumRoutes);

app.listen(3000);