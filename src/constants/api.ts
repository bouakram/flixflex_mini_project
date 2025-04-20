export const API_KEY = ''; // PASTE YOUR API KEY HERE
export const BASE_URL = 'https://api.themoviedb.org/3';

// images reference: https://developer.themoviedb.org/reference/configuration-details
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const BACKDROP_SIZE = 'w1280';
export const POSTER_SIZE = 'w342';
export const PROFILE_SIZE = 'w185';

export const ENDPOINTS = {
  MOVIES: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    SEARCH: '/search/movie',
    DETAILS: (id: string) => `/movie/${id}`,
    VIDEOS: (id: string) => `/movie/${id}/videos`,
    CREDITS: (id: string) => `/movie/${id}/credits`,
  },
  TV: {
    POPULAR: '/tv/popular',
    TOP_RATED: '/tv/top_rated',
    SEARCH: '/search/tv',
    DETAILS: (id: string) => `/tv/${id}`,
    VIDEOS: (id: string) => `/tv/${id}/videos`,
    CREDITS: (id: string) => `/tv/${id}/credits`,
  },
};
