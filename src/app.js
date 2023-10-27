const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://vishalsingh7x7:Maxeffort%4021@cluster0.szioicm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("your_database_name");
    const quotesCollection = database.collection("quotes");

    // Fetch all quotes from the collection
    const quotes = await quotesCollection.find().toArray();

    console.log(quotes);

    return quotesCollection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

connectToDatabase();

module.exports = {
  connectToDatabase,
};
