const Quote = require("../models/Quote");
const { connectToDatabase } = require('../app');
const { ObjectId } = require('mongodb'); // Import ObjectID from MongoDB


// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const quotesCollection = await connectToDatabase();
    const createdQuote = await quotesCollection.insertOne(req.body);
    res.json(createdQuote);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the quote." });
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotesCollection = await connectToDatabase();
    const quotes = await quotesCollection.find().toArray();
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving quotes." });
  }
};

// Retrieve a quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const quotesCollection = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };
    const quote = await quotesCollection.findOne(query);
    if (!quote) {
      return res.status(404).json({ error: "Quote not found." });
    }
    res.json(quote);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the quote." });
  }
};

// Update a quote by ID
exports.updateQuote = async (req, res) => {
  try {
    const quotesCollection = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };

    // Specify the updates you want to apply
    const update = {
      $set: {
        name: req.body.name,
        expiryDate: req.body.expiryDate,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        files: req.body.files,
        tables: req.body.tables,
      },
    };

    // Perform the update
    const updatedQuote = await quotesCollection.findOneAndUpdate(
      query,
      update,
      { returnOriginal: false } // Set to false to return the updated document
    );

    if (!updatedQuote.value) {
      return res.status(404).json({ error: "Quote not found." });
    }

    res.json(updatedQuote.value);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating the quote." });
  }
};


// Delete a quote by ID
exports.deleteQuote = async (req, res) => {
  try {
    const quotesCollection = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };
    const deletedQuote = await quotesCollection.deleteOne(query);
    if (!deletedQuote) {
      return res.status(404).json({ error: "Quote not found." });
    }
    res.json(deletedQuote);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the quote." });
  }
};
