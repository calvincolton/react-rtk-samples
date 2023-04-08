import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAG_USERS_ALBUMS = "UsersAlbums";
const TAG_ALBUM = "Album";

const albumsAPI = createApi({
  reducerPath: "albums",
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
      createAlbum: builder.mutation({
        query: ({ title, userId }) => {
          return {
            method: "POST",
            url: "/albums",
            body: { title, userId },
          };
        },
        invalidatesTags: (result, error, album) => {
          return [{ type: TAG_USERS_ALBUMS, id: album.userId }];
        },
      }),

      fetchAlbums: builder.query({
        query: (userId) => {
          return {
            method: "GET",
            url: "/albums",
            params: { userId },
          };
        },
        providesTags: (result, error, userId) => {
          const tags = result.map((album) => {
            return { type: TAG_ALBUM, id: album.id };
          });
          tags.push({ type: TAG_USERS_ALBUMS, id: userId });
          return tags;
        },
      }),

      deleteAlbum: builder.mutation({
        query: (albumId) => {
          return {
            method: "DELETE",
            url: `/albums/${albumId}`,
          };
        },
        invalidatesTags: (result, error, albumId) => {
          return [{ type: TAG_ALBUM, id: albumId }];
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

export const { useFetchAlbumsQuery, useCreateAlbumMutation, useDeleteAlbumMutation } =
  albumsAPI;
export { albumsAPI };
