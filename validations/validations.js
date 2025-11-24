const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: joi.ref("password"),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

module.exports = { registerSchema, loginSchema };
