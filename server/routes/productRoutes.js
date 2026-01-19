const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// --- GET ALL PRODUCTS ---
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// --- POST NEW PRODUCT ---
// Notice: We removed 'upload.single' because the frontend handles the upload now!
router.post('/', async (req, res) => {
  try {
    const { name, price, category, imageUrl } = req.body;

    // Protection: Ensure no empty fields are saved
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: "Name, price, and image are required." });
    }

    const newProduct = new Product({
      name,
      price: Number(price), // Ensures price is a number for your database
      category: category || 'Women', // Defaults to Women if missing
      imageUrl // This is the link: https://res.cloudinary.com/...
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// --- DELETE PRODUCT ---
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- GET SINGLE PRODUCT ---
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;