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
    const users = await this.readDb("users");
    const user = users.find((u) => u.email === email);

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
    const users = await this.readDb("users");

    newUser.id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    delete newUser.confirm_password;

    users.push(newUser);
    await this.writeDb("users", users);
  }

  // Logout
  async logout() {
    await this.writeDb("auth", { user: null });
  }
}

module.exports = AuthService;
