class ProductController {
  // get all products
  async getAllProducts(req, res) {
    try {
      const products = await req.app.locals.services.products.getAllProducts();
      res.render("index", { title: "Product List", products });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // get product by id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await req.app.locals.services.products.getProductById(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.render("product", { title: "Product", product });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // //PATCH (update) product by id
  // async updateProductById(req, res) {
  //   const { id } = req.params;

  // }

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
