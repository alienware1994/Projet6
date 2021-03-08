const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // éviter que plusieurs utilisateurs utilisent la même adresse mail

module.exports = mongoose.model("User", userSchema);