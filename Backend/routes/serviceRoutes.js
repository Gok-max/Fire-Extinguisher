const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceImage");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Add Service
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, description, type, url, category } = req.body; // ✅ added category

    const serviceUrl = req.file
      ? `/uploads/services/${req.file.filename}`
      : url;

    const newService = new Service({
      title,
      description,
      type,
      url: serviceUrl,
      category,
    });

    await newService.save();
    res.status(201).json({ msg: "Service added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Update Service
router.put("/:id", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, description, type, url, category } = req.body; // ✅ added category
    const serviceUrl = req.file ? `/uploads/services/${req.file.filename}` : url;

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, type, url: serviceUrl, category },
      { new: true }
    );

    res.json({ msg: "Service updated successfully", service: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Delete Service
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
