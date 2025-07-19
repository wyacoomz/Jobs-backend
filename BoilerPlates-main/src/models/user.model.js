import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    DOB: { type: String },
    City: { type: String },
    Qualification: { type: String },
    Skill: { type: String },

    // 🔐 Auth Info
    password: { type: String, required: true },

    // 🔹 Role Support
    role: {
      type: String,
      enum: ["user", "recruiter", "admin"],
      default: "user",
    },

    // 🔹 Recruiter Info (optional if role === 'recruiter')
    companyName: { type: String },
    companySize: { type: Number },
    businessType: { type: String },
    industry: { type: String },
    website: { type: String },
    location: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: Number },
    hiringNeeds: { type: Number },

    profilePhoto: { type: String },
    Coverphoto: { type: String },

    resetPasswordOTP: { type: String },
    resetPasswordOTPExpires: { type: Date },

    unlockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// 🔐 Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare password
UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Generate JWT
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default mongoose.model("User", UserSchema);
