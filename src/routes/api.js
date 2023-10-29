const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const entitesController = require('../controllers/entitiesController');
//db
const { connectToDatabase } = require('../app');

// Create a new quote
router.post('/quotes', quoteController.createQuote);
router.post('/platformProduct', entitesController.createPlatformProduct);
router.post('/concept', entitesController.createConcept);

// Retrieve all quotes
router.get('/quotes', quoteController.getAllQuotes);
router.get('/platformProduct', entitesController.getAllPlatformProduct);

// Retrieve a quote by ID
router.get('/quotes/:id', quoteController.getQuoteById);
router.get('/platformProduct/:id', entitesController.getPlatformProductById);

// Update a quote by ID
router.put('/quotes/:id', quoteController.updateQuote);
// router.put('/quotes/:id', entitesController.updatePlatformProduct);

// Delete a quote by ID
router.delete('/quotes/:id', quoteController.deleteQuote);

module.exports = router;
