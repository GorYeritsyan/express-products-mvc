const MainService = require("./MainService");

class ProductService extends MainService {
  async getAllProducts() {
    // Logic to get all products
    const products = await this.readDb("products");
    return products;
  }

  async getProductById(id) {
    // Logic to get a product by ID
    const products = await this.readDb("products");
    return products.find((product) => product.id === +id);
  }

  async updateProductById({ id, validProduct }) {
    const products = await this.readDb("products");
    const productIndex = products.findIndex((product) => product.id === +id);

    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    products[productIndex] = { ...products[productIndex], ...validProduct };
    // update the database
    await this.writeDb("products", products);
  }

  async deleteProductById(id) {
    // Logic to delete a product by ID
    const products = await this.readDb("products");
    const filteredProducts = products.filter((product) => product.id !== +id);

    // update the database
    await this.writeDb("products", filteredProducts);
  }
}

module.exports = ProductService;
