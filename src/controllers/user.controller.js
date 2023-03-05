const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mediaUpload } = require('../config/cloudinary');
const { userService } = require('../services');
const fs = require('fs');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'followers';
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserByUsername = catchAsync(async (req, res) => {
  
  const user = await userService.getUserByUsername(req.params.username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchUsers = catchAsync(async (req, res) => {
  const userResults = await userService.searchUsers(req.query.q);

  res.send({
    hits: userResults.length,
    results: userResults,
  });
});

const uploadAvatar = async (req, res) => {
  const user = req.user.id;
  const mediaFile = req.file;
  const userAvatar = await mediaUpload(mediaFile.path);
  fs.unlinkSync(mediaFile.path);

  const media = { fileType: mediaFile.mimeType, pathUrl: userAvatar.url };

  await userService.uploadAvatar(user, media);
  res.status(httpStatus.CREATED).send({ status: 'ok', avatar: media });
};

const followUser = async (req, res) => {
  const currentUser = req.user.id;
  const followedUser = req.params.userId;

  const filter = { _id: currentUser, following: followedUser };

  const user = await userService.findByFilter(filter);

  if (user.length) {
    const unfollowUpdate = { $pull: { followers: currentUser }, $inc: { followerCount: -1 } };
    const removeFromFollowing = { $pull: { following: followedUser }, $inc: { followingCount: -1 } };

    await userService.patchUserById(followedUser, unfollowUpdate);
    await userService.patchUserById(currentUser, removeFromFollowing);

    console.log('unfollowed user');
    res.status(httpStatus.OK).send({
      msg: 'unfollowed user',
    });
  } else {
    const followedUserUpdate = { $push: { followers: currentUser }, $inc: { followerCount: 1 } };
    const currentUserUpdate = { $push: { following: followedUser }, $inc: { followingCount: 1 } };

    await userService.patchUserById(followedUser, followedUserUpdate);
    await userService.patchUserById(currentUser, currentUserUpdate);

    console.log('followed user');
    res.status(httpStatus.OK).send({
      msg: 'followed user',
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUserByUsername,
  uploadAvatar,
  followUser,
};
