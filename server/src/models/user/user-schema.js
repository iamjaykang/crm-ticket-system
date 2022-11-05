const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  type: {
    type: String,
    maxlength: 6,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  pin: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
});

//mongoose will automatically enter collection as users when 'User' is put
module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
