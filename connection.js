const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority";

const client = new MongoClient(uri);

try {
  client.connect().then(() => {
    const many = [];

    for (let i = 0; i < 1000; i++) {
      many.push({
        Malzeme_Adi: "Transistör-" + i,
        Malzeme_Tipi: "BD138-" + i,
        Malzeme_Adedi: i,
        Alici: Math.random().toString(36).substr(2, 9),
      });
    }

    client
      .db("makerDb")
      .collection("deneme")
      .insertMany(many)
      .then((res) => console.log({ res }));
  });
} finally {
  client.close();
}
