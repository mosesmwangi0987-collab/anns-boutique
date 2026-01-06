require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
const products = require('./data/products');

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data to avoid duplicates
    await Product.deleteMany();

    // 2. Insert new data
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();