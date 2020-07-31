import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

require("dotenv").config({ path: "variables.env" });

import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators";
import User from "../../models/User";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    login: async (_, { username, password }) => {
      //Validate User Data
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      if (!user) {
        errors.general = "User not Found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrog Credetials";
        throw new UserInputError("Wrog Credetials", { errors });
      }

      //Create the token
      const token = generateToken(user);

      //Return the info
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      //Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //Makes sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      //hash password and createan auth token
      password = await bcrypt.hash(password, 12);

      //Create the new user
      const newUser = new User({
        email,
        username,
        password,
        createAt: new Date().toISOString(),
      });

      //Save in the DB
      const res = await newUser.save();

      //Create the token
      const token = generateToken(res);

      //Return the info
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
