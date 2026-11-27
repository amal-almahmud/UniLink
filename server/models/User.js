import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@kfupm\.edu\.sa$/i,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    major: {
      type: String,
      required: true,
      trim: true,
    },

    academicLevel: {
      type: String,
      required: true,
      enum: [
        "freshman",
        "sophomore",
        "junior",
        "senior",
      ],
    },

    acceptedTerms: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;