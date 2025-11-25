const joi = require('joi');

const schema = joi.string().valid('apple', 'banana', 'cherry');

const str = 'banana';

console.log(schema.validate(str));
