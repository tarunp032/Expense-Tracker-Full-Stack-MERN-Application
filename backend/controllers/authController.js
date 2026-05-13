const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Configure email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  try {
    // Create transporter INSIDE function, not at module level
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "FinTrack Pro - Your OTP for Login",
      html: `
        <h2>Welcome to FinTrack Pro</h2>
        <p>Your OTP for login is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      profession,
      address,
      profileImage,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !dateOfBirth ||
      !gender ||
      !profession ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      profession,
      address,
      profileImage: profileImage || null,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully. Please login to continue.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

// Login Controller (Generate and send OTP)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    user.otp = {
      code: otp,
      expiresAt: otpExpiresAt,
    };
    await user.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(user.email, otp);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({
      message: "OTP sent to your email. Please verify to login.",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};

// Verify OTP Controller
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Validate fields
    if (!userId || !otp) {
      return res.status(400).json({ message: "User ID and OTP are required" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP exists and is not expired
    if (!user.otp || !user.otp.code) {
      return res
        .status(400)
        .json({ message: "OTP not found. Please login again." });
    }

    if (new Date() > user.otp.expiresAt) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please login again." });
    }

    // Verify OTP
    if (user.otp.code !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Clear OTP
    user.otp = { code: null, expiresAt: null };
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res
      .status(500)
      .json({
        message: "Server error during OTP verification",
        error: error.message,
      });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware

    const user = await User.findById(userId).select("-password -otp");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching profile", error: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, phoneNumber, dateOfBirth, gender, profession, address, profileImage } = req.body;

    // Step 1: Pehle existing user fetch karo
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Ab update karo existing values ke saath
    const user = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName || existingUser.fullName,
        phoneNumber: phoneNumber || existingUser.phoneNumber,
        dateOfBirth: dateOfBirth || existingUser.dateOfBirth,
        gender: gender || existingUser.gender,
        profession: profession || existingUser.profession,
        address: address || existingUser.address,
        profileImage: profileImage || existingUser.profileImage,
      },
      { new: true }
    ).select("-password -otp");

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error updating profile", error: error.message });
  }
};

// Logout Controller (Frontend clears token)
exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during logout", error: error.message });
  }
};
