import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MediaItem } from '../../services/apiService';
import { API_KEY, BASE_URL, ENDPOINTS } from '../../constants/api';

export type MoviesResponeType = {
    page: number,
    total_pages: number,
    results: Array<MediaItem> | [],
};

export type TopRatedMoviesType = {
    results: Array<MediaItem> | [],
}

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    // tagTypes: ['Movies'],
    endpoints: (builder) => ({
        getMovies: builder.query<MoviesResponeType, number>({
            query: (page = 1) => ({
                url: ENDPOINTS.MOVIES.POPULAR,
                params: {
                    page,
                    api_key: API_KEY,
                },
            }),
            // providesTags: ['Movies'],
          }),
        getTopRatedMovies: builder.query<TopRatedMoviesType, void>({
            query: () => ({
                url: ENDPOINTS.MOVIES.TOP_RATED,
                params: {
                    api_key: API_KEY,
                },
            }),
          }),
    }),
});

export const {useGetMoviesQuery, useGetTopRatedMoviesQuery} = moviesApi;
