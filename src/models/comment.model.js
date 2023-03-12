const { string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
    // replies: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
    replies: [{}],
    replyCount: {
      type: Number,
      default: 0,
    },
    postedAt: { type: Date, default: Date.now },
    likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
