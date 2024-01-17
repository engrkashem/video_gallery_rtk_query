import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600, // default time is 60s
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        // ?title_like=css
        const queryString = title
          .split(" ")
          .map((item) => `title_like=${item}`)
          .join("&");
        return `/videos?${queryString}&_limit=4`;
      },
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
} = apiSlice;
