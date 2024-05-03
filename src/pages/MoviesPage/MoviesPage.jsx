import { fetchSearchMovie } from "../../request-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams, useLocation } from "react-router-dom";
import css from "./MoviesPage.module.css";
export default function MoviePage() {
  const [searchMovieResult, setsearchMovieResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const location = useLocation();
  console.log("location:", location);

  useEffect(() => {
    async function searchingTheFilm() {
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
    searchingTheFilm();
  }, [query]);

  const searchingTheFilm = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
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
      <ul>
        {searchMovieResult
          .sort((a, b) => {
            const yearA = parseInt(a.release_date.substring(0, 4));
            const yearB = parseInt(b.release_date.substring(0, 4));
            return yearB - yearA;
          })
          .map((movie) => (
            <li key={movie.id}>
              <MovieList movie={movie} state={location} />
            </li>
          ))}
      </ul>
    </>
  );
}
