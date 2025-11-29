const { ObjectId } = require("mongodb");
const MainService = require("./MainService");
const bcrypt = require("bcryptjs");

class UserService extends MainService {
  async getAllUsers({ name, email, role }) {
    const usersCollection = this.getCollection("users");
    let users = await usersCollection.find().toArray();

    if (name) {
      users = await usersCollection
        .find({
          name: { $regex: name, $options: "i" },
        })
        .toArray();
    }

    if (email) {
      users = await usersCollection
        .find({
          email: { $regex: email, $options: "i" },
        })
        .toArray();
    }

    if (role) {
      users = await usersCollection.find({ role }).toArray();
    }

    return users;
  }

  async getUserById(id) {
    const users = this.getCollection("users");
    return await users.findOne({ _id: new ObjectId(id) });
  }

  async createUser(newUser) {
    const users = this.getCollection("users");

    newUser.password = await bcrypt.hash(newUser.password, 10);
    delete newUser.confirm_password;

    await users.insertOne(newUser);
  }

  async updateUser({ id, updatedUser }) {
    const users = this.getCollection("users");
    console.log('UPDATED',updatedUser);
    
    await users.updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });
  }

  async deleteUser(id) {
    const users = this.getCollection("users");
    await users.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = UserService;
