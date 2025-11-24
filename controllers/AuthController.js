class AuthController {
  async getLogin(req, res) {
    res.render("login", { title: "Login" });
  }

  async getRegister(req, res) {
    res.render("register", { title: "Register" });
  }

  async login(req, res) {}

  async register(req, res) {}
}

module.exports = AuthController;
