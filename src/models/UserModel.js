const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee',
      required: true
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          // Regular expression for validating email format
          const vietnamPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
          return vietnamPhoneRegex.test(value);
        },
        message: 'Invalid Viet Nam phone format'
      }
    },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
