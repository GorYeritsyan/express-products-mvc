const { ObjectId } = require("mongodb");
const MainService = require("./MainService");

class CartService extends MainService {
  async getCartItems() {
    return await this.getCollection("cart").find().toArray();
  }

  async addToCart(productId) {
    const products = this.getCollection("products");
    const cartCollection = this.getCollection("cart");
    const product = await products.findOne({ _id: new ObjectId(productId) });

    const cartItem = await cartCollection.findOne({
      _id: new ObjectId(productId),
    });

    // increment count field
    if (cartItem) {
      await cartCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { count: 1 } }
      );
    }

    // set count field
    product.count = 1;
    await cartCollection.insertOne(product);

    // insert product to cart
    await cartCollection.insertOne(product);
  }

  async updateCartItem(productId) {
    const cartCollection = this.getCollection("cart");
    const products = this.getCollection("products");

    const cartItem = await cartCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (cartItem) {
      const updatedProduct = await products.findOne({
        _id: new ObjectId(productId),
      });

      await cartCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $set: updatedProduct }
      );
    }
  }

  async removeFromCart(productId) {
    await this.getCollection("cart").deleteOne({
      _id: new ObjectId(productId),
    });
  }
}

module.exports = CartService;
