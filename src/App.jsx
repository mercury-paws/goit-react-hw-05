import HomePage from "./pages/HomePage/HomePage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieList from "./components/MovieList/MovieList";

import {
  fetchTrendingFilms,
  fetchGenres,
  fetchCast,
  fetchReviews,
  fetchSearchMovie,
} from "./request-api";
import { useEffect, useState } from "react";

export default function App() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchMovieResult, setsearchMovieResult] = useState([]);

  useEffect(() => {
    async function getTrendingFilms() {
      try {
        const data = await fetchTrendingFilms();
        setTrendingFilms(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth happened");
      }
    }
    getTrendingFilms();
  }, []);

  useEffect(() => {
    async function getGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getGenres();
  }, []);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchCast(693134);
        setCast(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getCast();
  }, []);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchReviews(693134);
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getReviews();
  }, []);

  async function searchMovie(query) {
    if (!query) {
      return;
    }
    try {
      const data = await fetchSearchMovie(query);
      setsearchMovieResult(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("smth was done");
    }
  }

  return (
    <>
      <div>
        <button type="button">Home</button>
        <button type="button">Movies</button>
      </div>
      {/* <MovieList
        searchMovie={searchMovie}
        searchMovieResult={searchMovieResult}
      /> */}
      <HomePage trendingFilms={trendingFilms} genres={genres} />
      <MovieCast cast={cast} />
      <MovieReviews reviews={reviews} />
    </>
  );
}
