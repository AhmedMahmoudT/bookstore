import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const getUsers = async (_req, res) => {
  const users = await User.find({}, {firstName:1, lastName:1, email:1, _id:0}).sort({ firstName: 1 });
  res.status(200).json(users);
}

// login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// signup user
export const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, firstName, lastName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
