const MainService = require("./MainService");

class CartService extends MainService {
  async getCartItems() {
    return await this.readDb("cart");
  }

  async addToCart(productId) {
    const products = await this.readDb("products");
    const cart = await this.readDb("cart");

    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const cartItemIndex = cart.findIndex((item) => item.id === productId);

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].count++;
      await this.writeDb("cart", cart);
      return;
    }

    product.count = 1;

    cart.push(product);
    await this.writeDb("cart", cart);
  }

  async updateCartItem(productId) {
    const products = await this.readDb("products");
    const cartItems = await this.readDb("cart");
    const cartItemIndex = cartItems.findIndex((item) => item.id === productId);

    if (cartItemIndex !== -1) {
      const updatedProduct = products.find(
        (product) => product.id === productId
      );
      cartItems[cartItemIndex] = {
        ...cartItems[cartItemIndex],
        ...updatedProduct,
      };

      console.log("CART", cartItems[cartItemIndex]);

      await this.writeDb("cart", cartItems);
    }
  }

  async removeFromCart(productId) {
    const cart = await this.readDb("cart");
    const updatedCart = cart.filter((item) => item.id !== productId);
    await this.writeDb("cart", updatedCart);
  }
}

module.exports = CartService;
