import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription: "",
  credits: 0,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setCredits: (state, payload) => {
      state.subscription =
        payload.payload.subscription !== undefined &&
        payload.payload.subscription;
      state.credits =
        payload.payload.credits !== undefined && payload.payload.credits;
      console.log(payload.payload);
    },
  },
});

export const { setCredits } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
