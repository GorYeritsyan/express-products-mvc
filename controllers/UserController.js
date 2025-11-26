const { updateUserSchema } = require("../validations/validations");

class UserController {
  async getAllUsers(req, res) {
    const users = await req.app.locals.services.users.getAllUsers(req.query);
    const authUser = await req.app.locals.services.auth.getMe();
    const isAdmin = authUser?.role === "admin";

    res.render("users", { title: "Users", authUser, users, isAdmin });
  }

  async getAddUserPage(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();
    res.render("add-user", { title: "Add User", authUser });
  }

  async getUserEditPage(req, res) {
    const { id } = req.params;
    const user = await req.app.locals.services.users.getUserById(id);
    const authUser = await req.app.locals.services.auth.getMe();

    res.render("edit-user", { title: "Edit User", authUser, user });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedUser = await updateUserSchema.validateAsync(body);
      await req.app.locals.services.users.updateUser({ id, updatedUser });
      res
        .status(200)
        .json({ message: `User with ID ${id} updated successfully!` });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await req.app.locals.services.users.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = UserController;
