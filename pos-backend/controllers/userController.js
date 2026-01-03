const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// REGISTER
const register = async (req, res, next) => {
  try {
    let { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    email = email.toLowerCase().trim();
    role = role?.toLowerCase() || "cashier";

    const allowedRoles = ["admin", "cashier", "waiter"];
    if (!allowedRoles.includes(role)) {
      return next(createHttpError(400, "Invalid role"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "Email and password required"));
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET CURRENT USER (THIS FIXES YOUR 404)
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ✅ LOGOUT
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
