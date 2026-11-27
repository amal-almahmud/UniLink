import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateToken(userId) {
  return jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

export async function register(request, response) {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      major,
      academicLevel,
      acceptedTerms,
    } = request.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !major ||
      !academicLevel
    ) {
      return response.status(400).json({
        success: false,
        message: "Please complete all required fields",
      });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 8) {
      return response.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters",
      });
    }

    if (acceptedTerms !== true) {
      return response.status(400).json({
        success: false,
        message:
          "You must accept the Terms and Conditions",
      });
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return response.status(409).json({
        success: false,
        message:
          "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      major,
      academicLevel,
      acceptedTerms,
    });

    const token = generateToken(user._id);

    return response.status(201).json({
      success: true,
      message: "Account created successfully",
      token: token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        major: user.major,
        academicLevel: user.academicLevel,
      },
    });
  } catch (error) {
    console.error(
      `Registration error: ${error.message}`,
    );

    if (error.name === "ValidationError") {
      return response.status(400).json({
        success: false,
        message: "Invalid registration data",
      });
    }

    return response.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
}

export async function login(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return response.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatches) {
      return response.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return response.status(200).json({
      success: true,
      message: "Login successful",
      token: token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        major: user.major,
        academicLevel: user.academicLevel,
      },
    });
  } catch (error) {
    console.error(
      `Login error: ${error.message}`,
    );

    return response.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
}