const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, encrypted) => {
    user.password = encrypted;
    return next();
  });
});

module.exports = mongoose.model("User", UserSchema);
