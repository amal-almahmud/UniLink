import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(
  request,
  response,
  next,
) {
  try {
    const authorizationHeader =
      request.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return response.status(401).json({
        success: false,
        message: "Authentication is required",
      });
    }

    const token =
      authorizationHeader.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    const user = await User.findById(
      decodedToken.userId,
    ).select("-password");

    if (!user) {
      return response.status(401).json({
        success: false,
        message: "User account was not found",
      });
    }

    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}