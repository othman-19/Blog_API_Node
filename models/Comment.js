const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentShcema = new Schema(
  {
    text: {
      type: String,
      required: [true, "can't be blank"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, "can't be blank"],
    },
    commenter: {
      name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        maxlength: 100,
      },
      email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        maxlength: 200,
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

CommentShcema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model('Comment', CommentShcema);
