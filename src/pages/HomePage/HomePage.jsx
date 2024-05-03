import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { fetchTrendingFilms } from "../../request-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [toWatch, setToWatch] = useState(() => {
    const savedValue = localStorage.getItem("toWatch");
    return savedValue ? JSON.parse(savedValue) : {};
  });
  console.log(toWatch);
  const [liked, setToLike] = useState(() => {
    const savedValue = localStorage.getItem("likedFilms");
    return savedValue ? JSON.parse(savedValue) : {};
  });

  useEffect(() => {
    async function getTrendingFilms() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingFilms();
        setTrendingFilms(data);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
        console.log("smth happened");
      }
    }
    getTrendingFilms();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {loading && <b>Loading page...</b>}
      {error && <b>Error</b>}
      <div className={css.homepage}>
        <ol>
          {trendingFilms
            .sort((a, b) => b.vote_average - a.vote_average)
            .map((movie) => (
              <li key={movie.id}>
                <MovieList movie={movie} />
              </li>
            ))}
        </ol>
        <div className={css.likeToWatchContainer}>
          <ul className={css.likeContainer}>
            {Object.keys(liked).map((movieId) => (
              <li key={movieId}>{movieId}</li>
            ))}
          </ul>
          <ul className={css.toWatchContainer}>
            {Object.keys(toWatch).map((movieId) => (
              <li key={movieId}>{movieId}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
