const express = require('express');

const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/storage');
const parseStringToArray = require('../../middlewares/parseStringToArray');
const validate = require('../../middlewares/validate');

const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('managePosts'),
    upload.array('media'),
    parseStringToArray(['tags', 'tools']),
    validate(postValidation.createPost),
    postController.createPost
  )
  .get(auth('managePosts'), validate(postValidation.getPosts), postController.getPosts);

router.get('/search', auth('managePosts'), postController.searchQueryPosts);

router.get('/like/:postId', auth('likePosts'), validate(postValidation.likePost), postController.likePost);

router.get('/view/:postId', auth('viewPosts'), validate(postValidation.viewPost), postController.viewPost);

router
  .route('/:postId')
  .get(auth('getPosts'), validate(postValidation.getPost), postController.getPost)
  .patch(
    auth('managePosts'),
    upload.array('media'),
    parseStringToArray(['tags', 'tools']),
    validate(postValidation.updatePost),
    postController.updatePost
  )
  .delete(auth('managePosts'), validate(postValidation.deletePost), postController.deletePost);

router
  .route('/comments/:postId')
  .get(auth('managePosts'), postController.getComments)
  .post(auth('managePosts'), validate(postValidation.createComment), postController.createComment);

router.route('/comment/replies/:commentId').get(auth('managePosts'), postController.getCommentById);

router.route('/comment/reply/:commentId').post(auth('managePosts'), postController.createReply);

module.exports = router;
