const mongoose = require('mongoose');

// Define a list of allowed product names
const allowedProductNames = ['Django', 'Python', 'SOLID', 'Design Patterns', 'Other'];

// Define the schema for the "PlatformProducts" collection
const platformProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    enum: allowedProductNames,
  },
  description: String,
});

// Create the Mongoose model
const PlatformProduct = mongoose.model('PlatformProduct', platformProductSchema);

// Define a list of allowed categories
const allowedCategories = ['Category1', 'Category2', 'Category3', 'Other'];

// Define the schema for the "Concepts" collection
const conceptSchema = new mongoose.Schema({
  title: String,
  description: String,
  text_concept: String, // Assuming it's a rich text field
  video_concept: String, // Assuming it's a URL
  key_terms: [String], // An array of strings
  category: {
    type: String,
    required: true,
    enum: allowedCategories,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlatformProduct',
  },
});

// Create the Mongoose model for Concepts
const Concept = mongoose.model('Concept', conceptSchema);

console.log("models file");

// Export the models for use in other parts of your application
module.exports = {
  PlatformProduct,
  Concept,
};
