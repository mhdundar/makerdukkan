const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const port = 3512;
const uri =
  "mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new MongoClient(uri);

app.get("/:id", (req, res) => {
  client.connect().then(() => {
    client
      .db("makerDb")
      .collection("deneme")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((response) => res.json(response));
  });
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
