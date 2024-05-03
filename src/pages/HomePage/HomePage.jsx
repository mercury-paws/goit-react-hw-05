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

  const handleUnlike = (movieName) => {
    const savedValue = JSON.parse(localStorage.getItem("likedFilms"));
    console.log(savedValue);

    savedValue[movieName] = false;
    for (const key in savedValue) {
      if (!savedValue[key]) {
        delete savedValue[key];
      }
    }
    localStorage.setItem("likedFilms", JSON.stringify(savedValue));
    setToLike(savedValue);
  };

  const handleDeleteToWatch = (movieName) => {
    const savedValue = JSON.parse(localStorage.getItem("toWatch"));
    console.log(savedValue);

    savedValue[movieName] = false;
    for (const key in savedValue) {
      if (!savedValue[key]) {
        delete savedValue[key];
      }
    }
    localStorage.setItem("toWatch", JSON.stringify(savedValue));
    setToWatch(savedValue);
  };

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
        <div className={css.container}>
          <h3>My film list</h3>
          <div className={css.likeToWatchContainer}>
            <ul className={css.likeContainer}>
              <h4 className={css.headerFour}>Liked films</h4>
              {Object.keys(liked).map((movieName) => (
                <li key={movieName} className={css.filmNameList}>
                  <div className={css.name}>{movieName}</div>
                  <button
                    type="button"
                    className={css.deleteBtn}
                    onClick={() => handleUnlike(movieName)}
                  >
                    Unlike
                  </button>
                </li>
              ))}
            </ul>
            <ul className={css.toWatchContainer}>
              <h4 className={css.headerFour}>Films to watch</h4>
              {Object.keys(toWatch).map((movieName) => (
                <li key={movieName} className={css.filmNameList}>
                  <div className={css.name}>{movieName}</div>
                  <button
                    onClick={() => handleDeleteToWatch(movieName)}
                    type="button"
                    className={css.deleteBtn}
                  >
                    Remove from watchlist
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
