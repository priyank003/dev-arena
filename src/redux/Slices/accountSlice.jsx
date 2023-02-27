import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "accountSlice",
  initialState: {
    loggedIn: sessionStorage.getItem("comverse_customer_id") ? true : false,
    comverse_customer_id: sessionStorage.getItem("comverse_customer_id")
      ? sessionStorage.getItem("comverse_customer_id")
      : null,
    comverse_customer_email: sessionStorage.getItem("comverse_customer_email")
      ? sessionStorage.getItem("comverse_customer_email")
      : null,
    comverse_customer_token: null,
  },
  reducers: {
    loginReducer: (state, action) => {
      // debugger;
      state.comverse_customer_id = action.payload.data.id;
      sessionStorage.setItem("comverse_customer_id", action.payload.data.id);

      sessionStorage.setItem(
        "comverse_customer_email",
        action.payload.data.email
      );
      state.comverse_customer_email = action.payload.data.email;

      state.comverse_customer_token = action.payload.data.token;

      state.loggedIn = true;
    },
    logoutReducer: (state) => {
      // debugger;
      sessionStorage.removeItem("comverse_customer_id");
      sessionStorage.removeItem("comverse_customer_token");
      sessionStorage.removeItem("comverse_customer_email");

      state.loggedIn = false;

      state.comverse_customer_id = null;
      state.comverse_customer_email = null;
      state.comverse_customer_token = null;
    },
  },
});

export const { loginReducer, logoutReducer } = accountSlice.actions;
export default accountSlice.reducer;
