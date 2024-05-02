import { fetchSearchMovie } from "../../request-api";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviePage() {
  const [searchMovieResult, setsearchMovieResult] = useState([]);

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
  const searchingTheFilm = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    searchMovie(query);
  };

  return (
    <>
      <p>SearchFiled</p>
      <form onSubmit={searchingTheFilm}>
        <input type="text" name="searchQuery" />
        <button type="submit">Search</button>
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
              <MovieList movie={movie} />
            </li>
          ))}
      </ul>
    </>
  );
}
