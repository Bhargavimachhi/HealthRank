const express = require('express');
    const dotenv = require('dotenv');
    const mongoose = require("mongoose");
    const cors = require("cors");
    
    
    dotenv.config();
    
    
    const app = express();
    
    
    app.use(express.json());
    app.use(cors());

    
    
   
    app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello from the backend!' });
    });
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, async() => {

       try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
      console.log(`🚀 Server running on port ${PORT}`);
    });