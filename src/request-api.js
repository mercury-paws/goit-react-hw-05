import axios from "axios";


export const API_KEY = "d213862c0092dda4b7725e306d2b5265";
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjEzODYyYzAwOTJkZGE0Yjc3MjVlMzA2ZDJiNTI2NSIsInN1YiI6IjY2MmI2OWRkYjUxM2E4MDExYzNmMTA1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mkjXUUbevopMDRqZnWm_qBMR85CyR6ACrcMCc8lJ0nM";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchTrendingFilms = async () => {
  const response = await axios.get("trending/movie/day", {
    params: {
      api_key: { API_KEY },
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
  // console.log(response.data);
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
  // console.log(response.data);
};

export const fetchTVShowDetails = async (movieId) => {
  const response = await axios.get(`tv/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
  // console.log(response.data);
};

export const fetchGenres = async () => {
  const response = await axios.get("genre/movie/list", {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.genres;
  // console.log(response.data);
};

export const fetchTrendingTVShows = async () => {
  const response = await axios.get("trending/tv/day", {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
};

export const fetchSearchMovie = async (movieName) => {
  const response = await axios.get("search/movie", {
    params: {
      query: movieName,
      // page: 1,
      // region: "",
      // year: "",
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
  // console.log(response);
};

// https://api.themoviedb.org/3/search/movie/?query=Batman&api_key=d213862c0092dda4b7725e306d2b5265

export const fetchCast = async (movie_id) => {
  const response = await axios.get(`movie/${movie_id}/credits`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.cast;
  // console.log(response.data.cast);
};

export const fetchReviews = async (movie_id) => {
  const response = await axios.get(`movie/${movie_id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
  // console.log(response.data.results);
};

export const fetchTVCast = async (movie_id) => {
  const response = await axios.get(`tv/${movie_id}/credits`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.crew;
  // console.log(response);
};

export const fetchTVReviews = async (movie_id) => {
  const response = await axios.get(`tv/${movie_id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
  // console.log(response.data.results);
};
