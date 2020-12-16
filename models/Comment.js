const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
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
  },
  { timestamps: true },
);

CommentSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

CommentSchema.post('save', function (next) {
  this.model('Post')
    .update(
      { $push: { comments: this._id } },
    )
    .exec()
    .then(updatedPost => next(updatedPost))
    .catch(err => next(err));
});

module.exports = mongoose.model('Comment', CommentSchema);
