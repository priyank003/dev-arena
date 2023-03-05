const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    conversationName: {
      type: String,
      default: '',
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
