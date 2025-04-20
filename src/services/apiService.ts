import axios from 'axios';
import { API_KEY, BASE_URL, ENDPOINTS } from '../constants/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export interface MediaItem {
  id: string;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  original_language?: string;
}

export interface MediaDetails extends MediaItem {
  origin_country: string[];
  genres: Array<{ id: number; name: string }>;
  profile_path: string;
  tagline: string;
}

export interface VideoResult {
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface CreditsResult {
 cast: Array<{
  original_name: string;
  profile_path: string;
 }>;
}

export const getTopRatedMovies = () => api.get(ENDPOINTS.MOVIES.TOP_RATED);
export const getPopularMovies = (page = 1) => api.get(ENDPOINTS.MOVIES.POPULAR, { params: { page } });
export const searchMovies = (query: string) => api.get(ENDPOINTS.MOVIES.SEARCH, { params: { query } });
export const getMovieDetails = (id: string) => api.get(ENDPOINTS.MOVIES.DETAILS(id));
export const getMovieVideos = (id: string) => api.get(ENDPOINTS.MOVIES.VIDEOS(id));
export const getMovieCredits = (id: string) => api.get(ENDPOINTS.MOVIES.CREDITS(id));

export const getTopRatedTVShows = () => api.get(ENDPOINTS.TV.TOP_RATED);
export const getPopularTVShows = (page = 1) => api.get(ENDPOINTS.TV.POPULAR, { params: { page } });
export const searchTVShows = (query: string) => api.get(ENDPOINTS.TV.SEARCH, { params: { query } });
export const getTVShowDetails = (id: string) => api.get(ENDPOINTS.TV.DETAILS(id));
export const getTVShowVideos = (id: string) => api.get(ENDPOINTS.TV.VIDEOS(id));
export const getTVShowCredits = (id: string) => api.get(ENDPOINTS.TV.CREDITS(id));
