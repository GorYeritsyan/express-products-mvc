const MainService = require("./MainService");

class CartService extends MainService {
  async getCartItems() {
    return await this.readDb("cart");
  }

  async addToCart(productId) {
    const products = await this.readDb("products");
    const cart = await this.readDb("cart");

    const product = products.find((p) => p.id === +productId);
    if (!product) {
      throw new Error("Product not found");
    }

    cart.push(product);
    await this.writeDb("cart", cart);
  }

  async removeFromCart(productId) {
    const cart = await this.readDb("cart");
    const updatedCart = cart.filter((item) => item.id !== +productId);
    await this.writeDb("cart", updatedCart);
  }
}

module.exports = CartService;
