import axios from "axios";
import { BASE_URL, BASE_URL_Local } from "./BASE_URL";
import { setupInterceptorsTo } from "../interceptor.js";

const API = setupInterceptorsTo(
  axios.create({
    baseURL: BASE_URL,
  })
);
// console.log(localStorage.getItem("access_token"));

/*auth APIs*/

export const userSignup = (data) => API.post("/auth/register", data);
export const userLogin = (data) => API.post("/auth/login", data);
export const userLogout = (data) => API.post("/auth/logout", data);
export const refreshToken = (data) => API.post("/auth/refresh-tokens", data);

/*users*/

export const getAllUsers = () => API.get(`/users`);
export const getUser = (data) => API.get(`/users/${data}`);
export const getUserByUsername = (username) =>
  API.get(`/users/profile/${username}`);
export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const searchUsers = (q) => API.get(`/users/search?q=${q}`);
export const uploadUserAvatar = (data) => API.post("/users/avatar", data);
export const followUser = (id) => API.get(`/users/follow/${id}`);
/*posts*/

export const addPost = (data) => API.post(`/posts`, data);
export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getAllposts = (filters) =>
  API.get(`/posts?filterBy=${filters ? filters : ""}`);
export const getPostsByquery = (q) => API.get(`/posts?${q}`);
export const searchPosts = (q, filters) =>
  API.get(`/posts/search?q=${q}&${filters}`);
export const deletePost = () => API.get(`/posts`);
export const viewPost = (id) => API.get(`/posts/view/${id}`);
export const likePost = (id) => API.get(`/posts/like/${id}`);
export const commentPost = (postId, data) =>
  API.post(`/posts/comments/${postId}`, data);

export const createReply = (commentId, data) =>
  API.post(`/posts/comment/reply/${commentId}`, data);

export const getComments = (postId) => API.get(`/posts/comments/${postId}`);
export const getCommentById = (commentId) =>
  API.get(`/posts/comment/replies/${commentId}`);

/*subscription*/

export const purchase = (data) => API.post(`/subscriptions/pay`, data);
export const subscribe = (id, credits) =>
  API.get(`/subscriptions/subscribe?sessionId=${id}&credits=${credits}`);
export const getSubscription = (id) => API.get(`/subscriptions/user/${id}`);

/*jobs*/

export const addJob = (data) => API.post(`/jobs`, data);
export const getJobs = (filter) => API.get(`/jobs?${filter}`);
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const searchJobs = (q, filter) =>
  API.get(`/jobs/search?q=${q}&${filter}`);
export const updateJob = (id, data) => API.patch(`/jobs/${id}`, data);

/*conversations*/

export const getUsers = () => API.get("/conversations/users");
export const getConversation = (receiver) =>
  API.get(`/conversations/get/${receiver}`);
export const getConversations = () => API.get("/conversations");

export const newConversation = (data) => API.post(`/conversations/init`, data);
export const getMessagesInConversation = (id) =>
  API.get(`/conversations/messages/?conversationId=${id}`);
export const newMessage = (data) => API.post(`/conversations/messages`, data);
export const readMessage = (data) =>
  API.post(`/conversations/messages/read`, data);
