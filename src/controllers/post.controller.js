const httpStatus = require('http-status');
const fs = require('fs');
const { randomBytes } = require('crypto');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { mediaUpload } = require('../config/cloudinary');
const { postService, userService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const mediaFiles = req.files;

  const uploadData = await Promise.all(
    mediaFiles.map(async (file) => {
      const newUpload = await mediaUpload(file.path);

      fs.unlinkSync(file.path);

      return { fileType: file.mimetype, pathUrl: newUpload.url };
    })
  );

  const postPayload = {
    ...req.body,
    posterId: `p${randomBytes(8).toString('hex')}`,
    author: req.user.id,
    media: uploadData,
  };
  const post = await postService.createPost(postPayload);

  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'filterBy']);
  options.populate = 'author,comments';

  const result = await postService.queryPosts(options, req.user.id);

  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const likePost = catchAsync(async (req, res) => {
  const filter = { _id: req.user.id, likedPosts: req.params.postId };
  const user = await userService.findByFilter(filter);

  if (user.length) {
    const update = { $pull: { likedBy: req.user.id }, $inc: { likesCount: -1 } };
    const post = await postService.patchPostById(req.params.postId, update);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }

    const userUpdate = { $pull: { likedPosts: req.params.postId } };
    await userService.patchUserById(req.user.id, userUpdate);
    console.log('unliked post');
    return res.send('unliked');
    // throw new ApiError(httpStatus.CONFLICT, 'Post already liked');
  }

  const update = { $push: { likedBy: req.user.id }, $inc: { likesCount: 1 } };
  const post = await postService.patchPostById(req.params.postId, update);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const userUpdate = { $push: { likedPosts: req.params.postId } };
  await userService.patchUserById(req.user.id, userUpdate);
  console.log('liked post');

  return res.sendStatus(httpStatus.OK);
});

const viewPost = catchAsync(async (req, res) => {
  const filter = { _id: req.user.id, viewedPosts: req.params.postId };
  const user = await userService.findByFilter(filter);

  if (user.length) {
    throw new ApiError(httpStatus.CONFLICT, 'Post already viewed');
  }

  const update = { $push: { viewedBy: req.user.id }, $inc: { viewsCount: 1 } };

  const post = await postService.patchPostById(req.params.postId, update);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const userUpdate = { $push: { viewedPosts: req.params.postId } };
  await userService.patchUserById(req.user.id, userUpdate);

  res.sendStatus(httpStatus.OK);
});

const updatePost = catchAsync(async (req, res) => {
  const postPayload = {
    ...req.body,
    media: req.files.map((file) => {
      return { fileType: file.mimetype, filePath: file.path.replace('public', '') };
    }),
  };
  const post = await postService.updatePostById(req.params.postId, postPayload);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchQueryPosts = catchAsync(async (req, res) => {
  // const page = parseInt(req.query.page) - 1 || 0;
  // const limit = parseInt(req.query.limit) || 5;

  const options = pick(req.query, ['q', 'filterBy']);

  if (options.q === '') {
    throw new ApiError(httpStatus.NOT_FOUND, 'please enter a valid search');
  }

  // let sort = req.query.sort || 'rating';

  const searchResults = await postService.searchPosts(options);

  res.send({
    hits: searchResults.length,
    results: searchResults,
  });
});

const createComment = catchAsync(async (req, res) => {
  const commentPayload = {
    ...req.body,
    commentId: `c${randomBytes(8).toString('hex')}`,
    author: req.user.id,
  };
  const comment = await postService.createComment(commentPayload);

  const postCommentUpdate = { $push: { comments: comment._id }, $inc: { totalComments: 1 } };
  const post = await postService.patchPostById(req.params.postId, postCommentUpdate);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  res.status(httpStatus.CREATED).send(comment);
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  viewPost,
  createComment,
  searchQueryPosts,
};
