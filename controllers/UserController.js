const {
  updateUserSchema,
  registerSchema,
} = require("../validations/validations");

class UserController {
  // Get All Users filtered by query params
  async getAllUsers(req, res) {
    let users = await req.app.locals.services.users.getAllUsers(req.query);
    const authUser = await req.app.locals.services.auth.getMe();
    const isAdmin = authUser?.role === "admin";

    res.render("users", { title: "Users", authUser, users, isAdmin });
  }

  // Get User Add page
  async getUserAddPage(req, res) {
    const authUser = await req.app.locals.services.auth.getMe();
    res.render("add-user", { title: "Add User", authUser });
  }

  // Get User edit page
  async getUserEditPage(req, res) {
    const { id } = req.params;
    const user = await req.app.locals.services.users.getUserById(id);
    const authUser = await req.app.locals.services.auth.getMe();

    res.render("edit-user", { title: "Edit User", authUser, user });
  }

  // Create User
  async createUser(req, res) {
    try {
      const newUser = await registerSchema.validateAsync(req.body);
      await req.app.locals.services.users.createUser(newUser);
      res.redirect("/users");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // Update User
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

  // Delete User
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
