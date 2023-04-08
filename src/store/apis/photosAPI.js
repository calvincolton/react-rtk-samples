import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAG_PHOTO = "Photo";
const TAG_ALBUMS_PHOTO = "AlbumsPhotos";

const photosAPI = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    // DEV ONLY!!! - used to simulate slow network connections
    fetchFn: async (...args) => {
      await pause(750);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => {
    return {
      createPhoto: builder.mutation({
        query: ({ url, albumId }) => {
          return {
            method: "POST",
            url: "/photos",
            body: { url, albumId },
          };
        },
        invalidatesTags: (result, error, photo) => {
          return [{ type: TAG_ALBUMS_PHOTO, id: photo.albumId }];
        },
      }),

      fetchPhotos: builder.query({
        query: (albumId) => {
          return {
            method: "GET",
            url: "/photos",
            params: { albumId },
          };
        },
        providesTags: (result, error, albumId) => {
          const tags = result.map((photo) => {
            return { type: TAG_PHOTO, id: photo.id };
          });
          tags.push({ type: TAG_ALBUMS_PHOTO, id: albumId });
          return tags;
        },
      }),

      deletePhoto: builder.mutation({
        query: (photoId) => {
          return {
            method: "DELETE",
            url: `/photos/${photoId}`,
          };
        },
        invalidatesTags: (result, error, photoId) => {
          return [{ type: TAG_PHOTO, id: photoId }];
        },
      }),
    };
  },
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const { useFetchPhotosQuery, useCreatePhotoMutation, useDeletePhotoMutation } =
  photosAPI;
export { photosAPI };
