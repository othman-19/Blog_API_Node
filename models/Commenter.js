const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommenterSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      maxlength: 100,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
  },
);

module.exports = mongoose.model('User', CommenterSchema);
