const { registerSchema, loginSchema } = require("../validations/validations");

class AuthController {
  async getLogin(req, res) {
    res.render("login", { title: "Login" });
  }

  async getRegister(req, res) {
    res.render("register", { title: "Register" });
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
