var express = require("express");
const ProductController = require("../controllers/ProductController");
var router = express.Router();

const procuctController = new ProductController();

/* GET home page. Products list */
router.get("/", procuctController.getAllProducts);

// Create new product
router.post("/", procuctController.createProduct);

// get product add page
router.get("/add-product", procuctController.getProductAddPage);
// GET edit page for product by id
router.get("/products/edit/:id", procuctController.getEditPage);

// GET single product by id
router.get("/products/:id", procuctController.getProductById);

// UPDATE product by id
router.patch("/products/:id", procuctController.updateProductById);

// DELETE product by id
router.delete("/:id", procuctController.deleteProductById);

module.exports = router;
