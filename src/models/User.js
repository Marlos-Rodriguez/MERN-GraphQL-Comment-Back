import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", userSchema);
