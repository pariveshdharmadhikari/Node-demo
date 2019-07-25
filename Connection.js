var express = require("express");
var router = express.Router();
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_project"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB ");
});

module.exports = connection;
