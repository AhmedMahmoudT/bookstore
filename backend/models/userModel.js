import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// to access .env variables
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  // validation
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be completed");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }


  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be completed");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password incorrect");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
export default User;
