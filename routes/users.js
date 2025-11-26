var express = require("express");
const UserController = require("../controllers/UserController");
var router = express.Router();

const userController = new UserController();

/* GET users listing. */
router.get("/", userController.getAllUsers);

// get add user form
router.get("/add", userController.getAddUserPage);

router.get("/:id", userController.getUserEditPage);

router.post('/', userController.createUser)

// update user details
router.patch("/:id", userController.updateUser);

// delete  a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
