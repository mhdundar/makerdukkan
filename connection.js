const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority";

const client = new MongoClient(uri);

try {
  client.connect().then(() => {
    client.db("sample_airbnb").collection("listingsAndReviews").insertOne({
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1,
    });
  });
} finally {
  client.close();
}
