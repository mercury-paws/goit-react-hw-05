import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { fetchTrendingFilms, fetchTrendingTVShows } from "../../request-api";
import MovieList from "../../components/MovieList/MovieList";
import TvShow from "../../components/TVshow/TvShow";
import { Link } from "react-router-dom";
import { fetchLikedFilms } from "../../backend_api";

export default function HomePage() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trendingTVShows, setTrendingTVShows] = useState([]);

  const [toWatch, setToWatch] = useState(() => {
    const savedValue = localStorage.getItem("toWatch");
    return savedValue ? JSON.parse(savedValue) : {};
  });

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

  useEffect(() => {
    async function getTrendingTVShows() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingTVShows();
        setTrendingTVShows(data);
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
    getTrendingTVShows();
  }, []);

  async function fetchLiked() {
    try {
      const data = await fetchLikedFilms(1);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Trending today</h1>
      <button onClick={() => fetchLiked(1)}>fetch</button>
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
        <ol>
          {trendingTVShows
            .sort((a, b) => b.vote_average - a.vote_average)
            .map((tvshow) => (
              <li key={tvshow.id}>
                <TvShow tvshow={tvshow} />
              </li>
            ))}
        </ol>

        <div className={css.container}>
          <h3>My film list</h3>
          <div className={css.likeToWatchContainer}>
            <ul className={css.likeContainer}>
              <h4 className={css.headerFour}>Liked films</h4>

              {Object.keys(liked).map((key) => {
                if (key === "id") return null;
                return (
                  <li key={key} className={css.filmNameList}>
                    <div className={css.name}>
                      <Link to={`/movies/${liked.id}`} className={css.name}>
                        {key}
                      </Link>
                    </div>
                    <button
                      type="button"
                      className={css.deleteBtn}
                      onClick={() => handleUnlike(key)}
                    >
                      Unlike
                    </button>
                  </li>
                );
              })}
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
