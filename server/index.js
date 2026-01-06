const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These settings help maintain a stable connection for a serious business
      serverSelectionTimeoutMS: 5000, // Keep trying for 5 seconds before giving up
      socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Exit process with failure if connection is impossible
    process.exit(1);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server launched on http://localhost:${PORT}`);
  });
});