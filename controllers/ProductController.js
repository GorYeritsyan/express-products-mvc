const { productSchema } = require("../validations/validations");

class ProductController {
  // get all products
  async getAllProducts(req, res) {
    try {
      const products = await req.app.locals.services.products.getAllProducts(
        req.query
      );
      const authUser = await req.app.locals.services.auth.getMe();

      const isAdmin = authUser?.role === "admin";

      res.render("index", { title: "Products", products, authUser, isAdmin });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async getAddProductPage(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();
    res.render("add-product", { title: "Add Product", authUser });
  }

  async createProduct(req, res) {
    try {
      const validProduct = await productSchema.validateAsync(req.body);
      await req.app.locals.services.products.createProduct(validProduct);
      res.redirect("/");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async getEditPage(req, res) {
    const { id } = req.params;
    try {
      const product = await req.app.locals.services.products.getProductById(id);
      const authUser = await req.app.locals.services.auth.getMe();

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.render("edit", { title: "Edit product", product, authUser });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // get product by id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await req.app.locals.services.products.getProductById(id);
      const authUser = await req.app.locals.services.auth.getMe();

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.render("product", { title: "Product", product, authUser });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // //PATCH (update) product by id
  async updateProductById(req, res) {
    const { id } = req.params;
    try {
      const validProduct = await productSchema.validateAsync(req.body);
      await req.app.locals.services.products.updateProductById({
        id,
        validProduct,
      });
      res.json({ message: `Product with id ${id} updated successfully` });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async deleteProductById(req, res) {
    const { id } = req.params;
    try {
      await req.app.locals.services.products.deleteProductById(id);
      res.json({ message: `Product with id ${id} deleted successfully` });
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = ProductController;
