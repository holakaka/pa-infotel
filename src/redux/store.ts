import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice";
import actualdataReducer from "./slices/actualdataSlice";
import forecastReducer from "./slices/forecastSlice";

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    actualdata: actualdataReducer,
    forecast: forecastReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
