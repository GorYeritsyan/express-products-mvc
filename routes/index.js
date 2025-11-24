var express = require("express");
const ProductController = require("../controllers/ProductController");
var router = express.Router();

const procuctController = new ProductController();

/* GET home page. Products list */
router.get("/", procuctController.getAllProducts);

// GET single product by id
router.get("/:id", procuctController.getProductById);

// UPDATE product by id
// router.patch('/:id', procuctController.updateProductById);

// DELETE product by id
router.delete("/:id", procuctController.deleteProductById);

module.exports = router;
