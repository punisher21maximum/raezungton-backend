const Quote = require("../models/Quote");
// const { connectToDatabase } = require('../app');
const { ObjectId } = require("mongodb"); // Import ObjectID from MongoDB

const { PlatformProduct, Concept } = require("../models/Entities");
const { connectToDatabase } = require("../app");

// Create a PlatformProduct
exports.createPlatformProduct = async (req, res) => {
  try {
    const platformProductCollection = await connectToDatabase(
      "PlatformProduct"
    );
    const createdPlatformProduct = await platformProductCollection.insertOne(
      req.body
    );
    res.json(createdPlatformProduct);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the PlatformProduct." });
  }
};

exports.getAllPlatformProduct = async (req, res) => {
  try {
    const collection = await connectToDatabase("PlatformProduct");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving quotes." });
  }
};

exports.getPlatformProductById = async (req, res) => {
  try {
    const collection = await connectToDatabase("PlatformProduct");
    const query = { _id: new ObjectId(req.params.id) };
    const document = await collection.findOne(query);
    if (!document) {
      return res.status(404).json({ error: "Quote not found." });
    }
    res.json(document);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the quote." });
  }
};

// Update a quote by ID
exports.updatePlatformProduct = async (req, res) => {
  try {
    const ppCollection = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };

    // Specify the updates you want to apply
    const update = {
      $set: {
        ...req.body,
      },
    };

    // Perform the update
    const updatedDocument = await ppCollection.findOneAndUpdate(
      query,
      update,
      { returnOriginal: false } // Set to false to return the updated document
    );

    if (!updatedDocument.value) {
      return res.status(404).json({ error: "Quote not found." });
    }

    res.json(updatedDocument.value);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the quote." });
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

//--------------------------------------------------

// Create a new quote
exports.createConcept = async (req, res) => {
  // {
  //   "title": "New Concept 2",
  //   "description": "A concept with a reference",
  //   "text_concept": "Sample text",
  //   "video_concept": "https://example.com",
  //   "key_terms": [
  //       "term1",
  //       "term2"
  //   ],
  //   "category": "Category1",
  //   "product_name": "Django"
  // }

  const payload = req.body;

  const productQuery = { product_name: payload.product_name };

  const collection = await connectToDatabase("PlatformProduct");
  const platformProduct = await collection.findOne(productQuery);

  if (!platformProduct) {
    console.error(
      "PlatformProduct not found for product_name:",
      payload.product_name
    );
    return;
  }

  const conceptCollection = await connectToDatabase("Concept");

  delete payload.product_name;

  let createdConcept = await conceptCollection.insertOne({
    ...payload,
    product: platformProduct._id,
  });

  res.status(200).json(createdConcept);
};

exports.getAllQuotes = async (req, res) => {
  try {
    const conceptCollection = await connectToDatabase();
    const quotes = await conceptCollection.find().toArray();
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
    res
      .status(500)
      .json({ error: "An error occurred while updating the quote." });
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
