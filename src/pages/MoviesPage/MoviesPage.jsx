import { fetchSearchMovie } from "../../request-api";
import { useState, useEffect } from "react";
// import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams, useLocation } from "react-router-dom";
import css from "./MoviesPage.module.css";
import SearchedFilms from "../../components/SearchedFilms/SearchedFilms";
// import Upcoming from "../../components/Upcoming/Upcoming";
export default function MoviePage() {
  const [searchMovieResult, setsearchMovieResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const location = useLocation();
  console.log("location:", location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function searchingTheFilm() {
      if (!query) {
        return;
      }
      try {
        setLoading(true);
        setError(false);
        const data = await fetchSearchMovie(query);

        setsearchMovieResult(data);

        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
        console.log("smth was done");
      }
    }
    searchingTheFilm();
  }, [query]);

  const searchingTheFilm = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    if (query.length < 1 || !query) {
      setError(true);
      setsearchMovieResult([]);
    }
    searchParams.set("query", query);
    setSearchParams(searchParams);
  };

  return (
    <>
      <p className={css.search}>Search the film</p>
      <form onSubmit={searchingTheFilm} className={css.form}>
        <input type="text" name="searchQuery" className={css.input} />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      {loading && <b>Loading page...</b>}
      {error && <b>Error, please fill in the correct film name</b>}
      <div className={css.searchUpcomingContainer}>
        <ul className={css.searchedFilms}>
          {searchMovieResult
            .sort((a, b) => {
              const yearA = parseInt(a.release_date.substring(0, 4));
              const yearB = parseInt(b.release_date.substring(0, 4));
              return yearB - yearA;
            })
            .map((movie) => (
              <li key={movie.id}>
                <SearchedFilms movie={movie} state={location} />
              </li>
            ))}
        </ul>
        {/* <Upcoming /> */}
      </div>
    </>
  );
}
