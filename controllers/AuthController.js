const { registerSchema, loginSchema } = require("../validations/validations");

class AuthController {
  async getLogin(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();

    if (authUser) {
      res.redirect("/");
      return;
    }

    res.render("login", { title: "Login", authUser: null });
  }

  async getRegister(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();
    if (authUser) {
      res.redirect("/");
      return;
    }
    res.render("register", { title: "Register", authUser: null });
  }

  async login(req, res) {
    try {
      const validBody = await loginSchema.validateAsync(req.body);
      await req.app.locals.services.auth.login(validBody);
      res.redirect("/");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async register(req, res) {
    try {
      const validBody = await registerSchema.validateAsync(req.body);
      await req.app.locals.services.auth.register(validBody);
      res.redirect("/auth/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async logout(req, res) {
    try {
      await req.app.locals.services.auth.logout();
      res.redirect("/");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = AuthController;
