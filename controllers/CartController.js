class CartController {
  async getCartPage(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();
    const cartItems = await req.app.locals.services.cart.getCartItems();
    res.render("cart", { title: "Cart Items", authUser, cartItems });
  }

  async addToCart(req, res) {
    const { productId } = req.body;

    try {
      await req.app.locals.services.cart.addToCart(productId);
      res.redirect("/");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async removeFromCart(req, res) {
    const { id } = req.params;
    try {
      await req.app.locals.services.cart.removeFromCart(id);
      res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = CartController;
