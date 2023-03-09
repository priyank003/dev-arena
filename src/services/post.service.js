const httpStatus = require('http-status');

const { Post, User, Comment } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  return Post.create(postBody);
};

/**
 * Query for posts
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const timeStampCalculation = {
  past_24: 24 * 60 * 60 * 1000,

  past_week: 24 * 60 * 60 * 1000,
  past_month: 30 * 24 * 60 * 60 * 1000,
};

const queryPosts = async (options, userId) => {
  const followings = await User.find({ _id: userId });

  let filter = {};

  if (options.filterBy) {
    options.filterBy.split(',').forEach(async (filterOption) => {
      const [key, val] = filterOption.split(':');

      if (val.includes('||')) {
        filter['$or'] = [];
        const orSeparatedVal = val.split('||');
        orSeparatedVal.map((or) => {
          let tempObj = {};
          tempObj[key] = or;
          filter['$or'].push(tempObj);
        });
      } else if (key === 'tools' || key === 'tags') {
        const vals = val.split('&&');
        filter[key] = {
          $in: [...vals],
        };
      } else if (key === 'posts') {
        if (val === 'Followings') {
          // console.log(userId);
          let followingsList = [];

          followings[0].following.map((item) => followingsList.push(`${item._id}`));
          filter['author'] = {
            $in: followingsList,
          };
        } else if (val === 'New') {
          filter['createdAt'] = {
            $gte: new Date(new Date() - timeStampCalculation.past_week),
          };
        } else if (val === 'Trending') {
          options.sortBy = 'likesCount:desc';
        }
        // filter[key] = val;
      } else {
        filter[key] = val;
      }
    });
  }

  console.log(filter);

  const posts = await Post.paginate(filter, options);

  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  const post = await Post.findOne({ posterId: id })
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

  return post;
};

/**
 * Get post by userId
 * @param {string} userId
 * @returns {Promise<Post>}
 */
const getPostsByUserId = async (userId) => {
  return Post.find({ userId });
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

const patchPostById = async (postId, patch) => {
  return await Post.findOneAndUpdate({ posterId: postId }, patch);
};

const searchPosts = async ({ q, filterBy }) => {
  let filter = {};

  if (filterBy) {
    filterBy.split(',').forEach((filterOption) => {
      const [key, val] = filterOption.split(':');
      if (key === 'tools' || key === 'tags') {
        const vals = val.split('&&');
        filter[key] = {
          $in: [...vals],
        };
      }
    });
  }

  const searchResults = await Post.find({ title: { $regex: q, $options: 'i' }, ...filter })
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

  return searchResults;
};

const createComment = async (commentBody) => {
  return Comment.create(commentBody);
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  getPostsByUserId,
  updatePostById,
  deletePostById,
  patchPostById,
  createComment,
  searchPosts,
};
