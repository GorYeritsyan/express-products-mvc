const MainService = require("./MainService");

class UserService extends MainService {
  async getAllUsers({ name, email }) {
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

    return users;
  }

  async getUserById(id) {
    const users = await this.readDb("users");
    return users.find((user) => user.id === id);
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
