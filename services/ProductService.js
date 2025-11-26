const MainService = require("./MainService");

class ProductService extends MainService {
  async getAllProducts({ title, price, category }) {
    // Logic to get all products
    let products = await this.readDb("products");

    if (title) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (price) {
      products = products.filter((product) => product.price === Number(price));
    }

    if (category) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    return products;
  }

  async createProduct(validProduct) {
    const products = await this.readDb("products");
    const newProduct = {
      id: crypto.randomUUID(),
      ...validProduct,
    };
    products.push(newProduct);
    await this.writeDb("products", products);
  }

  async getProductById(id) {
    // Logic to get a product by ID
    const products = await this.readDb("products");
    return products.find((product) => product.id === id);
  }

  async updateProductById({ id, validProduct }) {
    const products = await this.readDb("products");
    const productIndex = products.findIndex((product) => product.id === id);

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
    const filteredProducts = products.filter((product) => product.id !== id);

    // update the database
    await this.writeDb("products", filteredProducts);
  }
}

module.exports = ProductService;
