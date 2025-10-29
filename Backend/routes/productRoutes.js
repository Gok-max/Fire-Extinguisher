const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.any(), async (req, res) => {
  try {
    const { name, description, category, keypoints, variants } = req.body;

    const mainImage = req.files.find((f) => f.fieldname === "image");
    const image = mainImage ? `/uploads/products/${mainImage.filename}` : "";

    const videoFile = req.files.find((f) => f.fieldname === "video");
    const video = videoFile ? `/uploads/products/${videoFile.filename}` : ""; 

    const parsedVariants = JSON.parse(variants || "[]").map((v, i) => {
      const variantImages = req.files
        .filter((f) => f.fieldname === `variantImage_${i}`)
        .map((file) => `/uploads/products/${file.filename}`);

      return {
        name: v.name,
        size: v.size,
        specifications: v.specifications,
        price: Number(v.price),
        gallery: variantImages,
      };
    });

    const newProduct = new Product({
      name,
      description,
      keypoints: JSON.parse(keypoints || "[]"), // 🆕 convert string array
      category,
      image,
      video,
      variants: parsedVariants,
    });

    await newProduct.save();
    res.status(201).json({ msg: "✅ Product added successfully", newProduct });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", authMiddleware, upload.any(), async (req, res) => {
  try {
    const { name, description, category, keypoints, variants } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) return res.status(404).json({ msg: "Product not found" });

    // 🖼️ Handle main image
    const mainImage = req.files.find((f) => f.fieldname === "image");
    const image = mainImage
      ? `/uploads/products/${mainImage.filename}`
      : existingProduct.image;

      const videoFile = req.files.find((f) => f.fieldname === "video");
      const video = videoFile
        ? `/uploads/products/${videoFile.filename}`
        : existingProduct.video;


    // 🧩 Parse variants and manage their gallery
    const parsedVariants = JSON.parse(variants || "[]").map((v, i) => {
      const variantImages = req.files
        .filter((f) => f.fieldname === `variantImage_${i}`)
        .map((file) => `/uploads/products/${file.filename}`);

      return {
        name: v.name,
        size: v.size,
        price: Number(v.price),
        specifications: v.specifications,
        gallery:
          variantImages.length > 0
            ? variantImages
            : v.gallery?.length
            ? v.gallery
            : existingProduct.variants[i]?.gallery || [],
      };
    });

    // ✅ Update fields
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.category = category;
    existingProduct.keypoints = JSON.parse(keypoints || "[]");
    existingProduct.image = image;
    existingProduct.video = video;
    existingProduct.variants = parsedVariants;

    await existingProduct.save();

    res.json({ msg: "✅ Product updated successfully", product: existingProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



// ✅ Delete product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "🗑️ Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
