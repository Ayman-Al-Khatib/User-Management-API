const mongoose = require('mongoose');
const validationSchemas = require('../utils/validationUser');
const yup = require('yup');
const { trim } = require('lodash');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 128,
      trim: true,
    },
    verifyCode: {
      type: String,
    },
    approve: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

async function validateUser({
  user,
  name = false,
  email = false,
  password = false,
  newPassword = false,
  approve = false,
  verifyCode = false,
  id = false,
}) {
  let schema = yup.object();
  if (name) schema = schema.shape({ name: validationSchemas.name });
  if (email) schema = schema.shape({ email: validationSchemas.email });
  if (password) schema = schema.shape({ password: validationSchemas.password });
  if (newPassword) schema = schema.shape({ newPassword: validationSchemas.newPassword });
  if (approve) schema = schema.shape({ approve: validationSchemas.approve });
  if (verifyCode) schema = schema.shape({ verifyCode: validationSchemas.verifyCode });
  if (id) schema = schema.shape({ id: validationSchemas.id });
  try {
    schema.validateSync(user, { abortEarly: false });
    return null;
  } catch (error) {
    return error.errors;
  }
}

exports.User = User;
exports.validateUser = validateUser;
