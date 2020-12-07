const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "can't be blank"],
      maxlength: 200,
    },
    text: {
      type: String,
      required: [true, "can't be blank"],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

PostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

PostSchema.pre('remove', function (next) {
  this.model('Comment').deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model('Post', PostSchema);
