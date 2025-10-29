const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const path = require("path");

dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/products', express.static(path.join(__dirname,'uploads/products')));
app.use('/uploads/services', express.static(path.join(__dirname, 'uploads/services')));
 // Serve uploaded files
app.use('/api/admin', adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/inquiry", inquiryRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Fire Business Backend Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
