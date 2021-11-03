const mongoose = require('mongoose');
const { isEmail } = require('validator');
const {
  invalidFormat,
  blankNameField,
  minLengthName,
  maxLengthName,
  blankEmailField,
  blankPasswordField,
  minLengthPassword,
} = require('../errors/errorsMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, blankNameField],
    minlength: [2, minLengthName],
    maxlength: [30, maxLengthName],
  },
  email: {
    type: String,
    unique: true,
    required: [true, blankEmailField],
    validate: {
      validator: (v) => isEmail(v),
      message: invalidFormat,
    },
  },
  password: {
    type: String,
    required: [true, blankPasswordField],
    minlength: [8, minLengthPassword],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
