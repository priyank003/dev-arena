import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

const toastSlice = createSlice({
	name: "toastSlice",
	initialState,
	reducers: {
		showToast: (state, payload) => {
			state.isOpen = true;
			console.log(payload);
		},
	},
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
