const { string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tools: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
    },
    media: {
      type: Array,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
    postedAt: { type: Date, default: Date.now },
    likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    viewedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

postSchema.index({ title: 'text' });

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
