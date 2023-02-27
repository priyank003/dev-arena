// Library Imports

// ⬇ The following Library Imports is for Sync Redux States across Browsers Tabs.

import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "@reduxjs/toolkit";
import { createStateSyncMiddleware } from "redux-state-sync";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import subscriptionReducer from "./Slices/subscriptionSlice";
import toastReducer from "./Slices/toastSlice";
import { persistReducer, persistStore } from "redux-persist";
// ⬇ Slices Imports

// import passwordReducer from "./Slices/passwordSlice";
// import accountReducer from "./Slices/accountSlice";
// import wishListReducer from "./Slices/wishListSlice";
// import multiLocationReducer from "./Slices/multiLocationSlice";
// import cartReducer from "./Slices/cartSlice";
// import checkoutReducer from "./Slices/checkoutSlice";

// ⬇ Do this if you want to Retain State Values on Reload.

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
	user: userReducer,
	toast: toastReducer,
	subscription: subscriptionReducer,
	//   passwordSlice: passwordReducer,
	//   accountSlice: accountReducer,
	//   wishListSlice: wishListReducer,
	//   multiLocationSlice: multiLocationReducer,
	//   cartSlice: cartReducer,
	//   checkoutSlice: checkoutReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = legacy_createStore(
// 	persistedReducer,
// 	composeEnhancers(
// 		applyMiddleware(
// 			thunk,
// 			createStateSyncMiddleware({
// 				blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
// 			})
// 		)
// 	)
// );

// const reducers = combineReducers({

// 		user: persistedReducer,
// 		toast: toastReducer,
// 	},
//    });

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	whiteList: ["user"],
// };
// const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
});
// export const persistor = persistStore(store);
