import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      enum: ["customer", "employee", "business", "admin"],
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    profileImage: {
      url: {
        type: String,
        default: "https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png", // Replace with your actual Cloudinary default image URL
      },
      public_id: {
        type: String,
        default: "", 
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);
export default User;
