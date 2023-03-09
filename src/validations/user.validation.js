const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const searchUsers = {
  query: Joi.object().keys({
    q: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getUserByUsername = {
  params: Joi.object().keys({
    username: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      password: Joi.string().custom(password),
      name: Joi.string(),
      username: Joi.string(),
      about: Joi.string(),
      location: Joi.string(),
      socials: {
        twitter: Joi.string().allow(null, ''),
        gitlab: Joi.string().allow(null, ''),
        github: Joi.string().allow(null, ''),
        linkedin: Joi.string().allow(null, ''),
        behance: Joi.string().allow(null, ''),
        codepen: Joi.string().allow(null, ''),
      },
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUserByUsername,
};
