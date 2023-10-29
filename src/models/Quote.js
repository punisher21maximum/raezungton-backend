const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: String,
  expiryDate: Date,
  status: String,
  totalAmount: Number,
  files: [String], // You can store file names or URLs here
  tables: [Object], // Define a schema for your tables
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
