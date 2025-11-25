const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: joi.ref("password"),
  role: joi.string().valid("user", "admin").required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const productSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  price: joi.number().positive().required(),
  category: joi
    .string()
    .valid("men's clothing", "women's clothing", "jewelery", "electronics")
    .required(),
});

module.exports = { registerSchema, loginSchema, productSchema };
