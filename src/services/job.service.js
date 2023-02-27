const httpStatus = require('http-status');
const { Job } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  return Job.create(jobBody);
};

/**
 * Query for jobs
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const timeStampCalculation = {
  past_24: {
    logic: 24 * 60 * 60 * 1000,
  },
  past_week: {
    logic: 24 * 60 * 60 * 1000,
  },
  past_month: {
    logic: 30 * 24 * 60 * 60 * 1000,
  },
};

const queryJobs = async (options) => {
  let filter = {};
  if (options.filterBy) {
    options.filterBy.split(',').forEach((filterOption) => {
      const [key, val] = filterOption.split(':');

      if (key === 'date') {
        filter['createdAt'] = {
          $gte: new Date(new Date() - timeStampCalculation[val].logic),
        };
      } else {
        filter[key] = val;
      }
    });
  }

  delete options.filterBy;

  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findById(id).populate('author');
};

/**
 * Get job by userId
 * @param {string} userId
 * @returns {Promise<Job>}
 */
const getJobsByUserId = async (userId) => {
  return Job.find({ userId });
};

const seachJobsByString = async (text) => {
  const regex = new RegExp(`${text}`);
  return Job.find({
    $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
  });
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobId, updateBody) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  Object.assign(job, updateBody);
  await job.save();
  return job;
};

const patchJobById = async (jobId, patch) => {
  return Job.findByIdAndUpdate(jobId, patch);
};

/**
 * Delete job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const deleteJobById = async (jobId) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();
  return job;
};

const searchJobs = async (options) => {
  let filter = { title: { $regex: options.q, $options: 'i' } };
  if (options.filterBy) {
    options.filterBy.split(',').forEach((filterOption) => {
      const [key, val] = filterOption.split(':');

      if (key === 'date') {
        filter['createdAt'] = {
          $gte: new Date(new Date() - timeStampCalculation[val].logic),
        };
      }
    });
  }

  const searchResults = await Job.find(filter).populate('author');

  return searchResults;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  getJobsByUserId,
  updateJobById,
  deleteJobById,
  patchJobById,
  seachJobsByString,
  searchJobs,
};
