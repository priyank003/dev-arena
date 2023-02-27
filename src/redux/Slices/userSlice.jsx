import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// email: "",
	// name: "",
	// acitivityStatus: "",
	// followerCount: "",
	// followingCount: "",
	// id: "",
	// isEmailVerified: "",
	// likedJobs: [],
	// likedPosts: [],
	// postsCount: "",
	// role: "",
	// username: "",
	// about: "",
	// location: "",
	// socials: {
	// 	twitter: "",
	// 	gitlab: "",
	// 	github: "",
	// 	linkedin: "",
	// 	behance: "",
	// 	codepen: "",
	// },
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUserData: (state, payload) => {
			state = Object.assign(state, payload.payload);
			console.log(payload.payload);
		},
	},
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
