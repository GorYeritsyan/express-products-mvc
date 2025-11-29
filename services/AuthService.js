const MainService = require("./MainService");
const bcrypt = require("bcryptjs");

class AuthService extends MainService {
  // get me
  async getMe() {
    const { user } = await this.readDb("auth");
    return user;
  }

  // Login
  async login({ email, password }) {
    const user = await this.getCollection("users").findOne({ email });

    if (!user) {
      throw new Error("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    await this.writeDb("auth", { user });
  }

  // Register
  async register(newUser) {
    const users = this.getCollection("users");

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    delete newUser.confirm_password;

    await users.insertOne(newUser);
  }

  // Logout
  async logout() {
    await this.writeDb("auth", { user: null });
  }
}

module.exports = AuthService;
