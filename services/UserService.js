const MainService = require("./MainService");
const bcrypt = require("bcryptjs");

class UserService extends MainService {
  async getAllUsers({ name, email, role }) {
    let users = await this.readDb("users");

    if (name) {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (email) {
      users = users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    if(role){
      users = users.filter((user) => user.role === role);
    }

    return users;
  }

  async getUserById(id) {
    const users = await this.readDb("users");
    return users.find((user) => user.id === id);
  }

  async createUser(newUser) {
    const users = await this.readDb("users");

    newUser.id = crypto.randomUUID();
    newUser.password = await bcrypt.hash(newUser.password, 10);
    delete newUser.confirm_password;

    users.push(newUser);
    await this.writeDb("users", users);
  }

  async updateUser({ id, updatedUser }) {
    const users = await this.readDb("users");
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser };
    await this.writeDb("users", users);
  }

  async deleteUser(id) {
    const users = await this.readDb("users");
    const filteredUsers = users.filter((user) => user.id !== id);
    await this.writeDb("users", filteredUsers);
  }
}

module.exports = UserService;
