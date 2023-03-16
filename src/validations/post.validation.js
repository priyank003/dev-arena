const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    media: Joi.array(),
    description: Joi.string().required(),
    tools: Joi.array().required(),
    tags: Joi.array(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    filterBy: Joi.string().allow(''),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      media: Joi.array(),
      description: Joi.string(),
      tools: Joi.array(),
      tags: Joi.array(),
    })
    .min(1),
};

const likePost = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const viewPost = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
};

const createComment = {
  body: Joi.object().keys({
    description: Joi.string().required(),
  }),
};
const createReply = {
  body: Joi.object().keys({
    description: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  viewPost,
  createComment,
  createReply,
};
