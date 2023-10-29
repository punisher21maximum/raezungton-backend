const { MongoClient, ServerApiVersion } = require("mongodb");
const { PlatformProduct, Concept } = require('./models/Entities');
const uri =
  "mongodb+srv://vishalsingh7x7:Maxeffort%4021@cluster0.szioicm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToDatabase(collectionName="Quote", databaseName="your_database_name") {
  try {
    await client.connect();
    // collectionName = ""
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Fetch all quotes from the collection
    // const quotes = await collection.find().toArray();

    // console.log(quotes);

    console.log("connected")

    const platformProductsData = [
        {
          product_name: 'Django',
          description: 'A high-level Python web framework',
        },
        {
          product_name: 'SOLID',
          description: 'A set of software design principles',
        },
        {
          product_name: 'Python',
          description: 'A versatile programming language',
        },
      ];
    
    // const resp = await collection.insertMany(platformProductsData);
    // console.log(resp);

    return collection;
    
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

connectToDatabase();

module.exports = {
  connectToDatabase,
};
