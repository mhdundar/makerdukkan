const {MongoClient} = require('mongodb');
const uri =
  'mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main() {
  const uri =
    'mongodb+srv://dukkan:1@cluster0.zrwkq.mongodb.net/makerDb?retryWrites=true&w=majority';

  

  try {

    await client.connect();
    await createListing(client, {
      name: 'Lovely Loft',
      summary: 'A charming loft in Paris',
      bedrooms: 1,
      bathrooms: 1,
    });
  } finally {
    await client.close();
  }
}

main().catch(console.error);


async function createListing(client, newListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`,
  );
}

async function createMultipleListings(client, newListings) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .insertMany(newListings);

  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`,
  );
  console.log(result.insertedIds);
}
