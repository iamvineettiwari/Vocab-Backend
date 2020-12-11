const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("mongoose");
const RouteHandler = require("./routes/v1/RouteHandler");
require('dotenv').config();

// CREATE EXPRESS APP
const app = express();
const PORT = process.env.PORT || 8080;

// CONNECT TO DATABASE
db.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then((val) => {
}).catch(err => {
})

// CONFIGURE APPLICATION TO PARSE JSON DATA TO REQUEST BODY
app.use(bodyParser.json());
app.use(cors());

// HANDLE REQUESTS FOR /api/v1 AT RouteHandler
app.use("/api/v1", RouteHandler);

// START APPLICATION EITHER ON SERVER ENV PORT OR 8080
app.listen(PORT, () => {
    console.log(`Application started at http://localhost:${PORT}`);
});