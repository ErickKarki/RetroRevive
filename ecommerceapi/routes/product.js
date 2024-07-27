const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../middleware/cloudinaryConfig");

const upload = multer({ storage });

//CREATE
router.post(
  "/upload",
  verifyTokenAndAdmin,
  upload.single("image"),
  async (req, res) => {
    console.log("Request body:", req.body);
    console.log("File info:", req.file);
    console.log("User info:", req.user); // Check this output

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newProduct = new Product({
      name: req.body.name,
      // title: req.body.title,
      price: req.body.price,
      img: req.file.path, // Save Cloudinary URL in the product model
      category: req.body.category,
      user: req.user._id, // Associate the product with the authenticated user

      // size: req.body.size,
      // color: req.body.color,
      // price: req.body.price,
      // inStock: req.body.inStock,
    });
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      console.error("Error saving product:", err);
      res.status(500).json(err);
    }
  }
);

//UPDATE
router.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.single("image"),
  async (req, res) => {
    const updatedData = {
      ...req.body,
    };
    if (req.file) {
      updatedData.imageUrl = req.file.path; // Update image URL if a new image is uploaded
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);

      res.status(500).json(err);
    }
  }
);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    console.error("Error deleting product:", err);

    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "user",
      select: "email", // Populate only the email field
    });
    res.status(200).json(product);
  } catch (err) {
    console.error("Error finding product:", err);
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      console.log("Querying products by category:", qCategory);
      products = await Product.find({
        category: qCategory,
      }).populate("user", "email");
      console.log("Found products:", products);
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    console.error("Error finding products:", err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;
