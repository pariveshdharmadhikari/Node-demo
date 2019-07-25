var express = require("express");
var router = express.Router();
var connection = require("../Connection");
var bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/", function(req, res, next) {
  let sql = "select * from product ORDER BY Name ASC";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: "Something went Wrong." });
    }
    // if (err) throw err;

    // res.json(rows);
    res.send({
      DataList: rows,
      DataObject: {},
    });
    // res.render("product", { product: rows });
  });
});

router.post("/create", function(req, res, next) {
  let Name = req.body.Name;
  let Category = req.body.Category;
  let Price = req.body.Price;
  let sql = `INSERT into product (Name,Category,Price) VALUES ("${Name}","${Category}","${Price}")`;
  connection.query(sql, function(err, result) {
    console.log(result);
    if (err) {
      res.status(500).send({ error: "Something went Wrong." });
    }
    // if (err) throw err;
    res.json({ status: "success", id: result.inserId });
    
    // res.render("product", { product: rows });
  });
});

router.put("/update/:id", function(req, res, next) {
  let id = req.params.id;
  let Name = req.body.Name;
  let Category = req.body.Category;
  let Price = req.body.Price;
  let sql = `UPDATE product SET Name="${Name}",Category="${Category}",Price="${Price}" WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    console.log(result);
    if (err) {
      res.status(500).send({ error: "Something went Wrong." });
    }
    // if (err) throw err;
    res.json({ status: "success", id: result.inserId });
    // res.render("product", { product: rows });
  });
});

router.delete("/delete/:id", function(req, res, next) {
  let id = req.params.id;
  let sql = `DELETE from product WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    console.log(result);
    if (err) {
      res.status(500).send({ error: "Something went Wrong." });
    }
    // if (err) throw err;
    res.json({ status: "success", id: result.inserId });
    // res.render("product", { product: rows });
  });
});

module.exports = router;
