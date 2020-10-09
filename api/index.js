const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");
const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new MongoClient(uri);

app.get("/", async function (req, res) {
  let page = req.query.page;
  let limit = req.query.limit;
});

app.get("/getir/:id", (req, res) => {
  client.connect().then(() => {
    client
      .db("makerDb")
      .collection("deneme")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((response) => res.json(response))
      .finally(() => client.close());
  });
});

let server = app.listen(3512, function () {
  console.log("Server is listening on port 8080");
});
