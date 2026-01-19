const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// --- 1. GET ALL PRODUCTS ---
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// --- 2. POST NEW PRODUCT (UPDATED) ---
// We removed 'upload.single' because the frontend handles the upload now!
router.post('/', async (req, res) => {
  try {
    const { name, price, category, imageUrl } = req.body;

    // Validation to prevent database errors
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields: Name, Price, or Image" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      category: category || 'Women',
      imageUrl // This is the 'https://...' link from Cloudinary
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// --- 3. DELETE PRODUCT ---
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;