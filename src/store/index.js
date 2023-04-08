import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersReducer } from "./users";
import { albumsAPI } from "./apis/albumsAPI";
import { photosAPI } from "./apis/photosAPI";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    [photosAPI.reducerPath]: photosAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsAPI.middleware)
      .concat(photosAPI.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./users";
export * from "./apis/albumsAPI";
export * from "./apis/photosAPI";
