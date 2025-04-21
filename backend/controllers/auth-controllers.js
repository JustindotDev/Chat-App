import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/jwt.js";
import cloudinary from "../lib/cloudinary.js";

export const Signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields. Please complete the form.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // generate jwt before saving user to db
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle Mongoose validation error
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: Object.values(error.errors)[0].message });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields. Please complete the form.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password Incorrect" });

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in the Login Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Succesfuly" });
  } catch (error) {
    console.log("Server Error", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResult.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in UpdateProfile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CheckAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
