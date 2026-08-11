const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['reader', 'author', 'both'],
      default: 'reader',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);