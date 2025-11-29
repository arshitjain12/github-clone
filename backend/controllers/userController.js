const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");


// SIGNUP

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check existing user
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token,userId: newUser._id  });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



// LOGIN

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



// GET ALL USERS

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).send("Server error!");
  }
};



// GET USER PROFILE

const getUserProfile = async (req, res) => {
  const currentID = req.params.id;

  try {
    const user = await User.findById(currentID);

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.json(user);

  } catch (err) {
    console.error("Profile Fetch Error:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
};



// UPDATE USER PROFILE

const updateUserProfile = async (req, res) => {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    let updateData = { email };
// if pass is not there ,null,undefine then it not run 
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      updateData.password = hashed;
    }

    const result = await User.findByIdAndUpdate(
      currentID,
      { $set: updateData },
      { new: true }
    );

    if (!result) return res.status(404).json({ message: "User not found!" });

    res.json({ message: "User updated successfully!" });

  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



// DELETE USER PROFILE

const deleteUserProfile = async (req, res) => {
  const currentID = req.params.id;

  try {
    const result = await User.findByIdAndDelete(currentID);

    if (!result) return res.status(404).json({ message: "User not found!" });

    res.json({ message: "User Profile Deleted!" });

  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).send("Server error!");
  }
};



// EXPORT
module.exports = {
  signup,
  login,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
