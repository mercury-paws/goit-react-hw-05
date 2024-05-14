import { fetchGenres, fetchTVShowDetails } from "../../request-api.js";
import { useState, useEffect, useRef, Suspense } from "react";
import { ImHeart, ImForward3 } from "react-icons/im";
import clsx from "clsx";
import css from "./TVDetailsPage.module.css";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function TVDetailsPage() {
  const { movieId } = useParams();

  const [genres, setGenres] = useState([]);
  const [movieInfo, setmovieInfo] = useState(null);

  const location = useLocation();
  const backLinkUrlRef = useRef(location.state || "/");

  useEffect(() => {
    async function getMovieDetailes() {
      try {
        const data = await fetchTVShowDetails(movieId);
        setmovieInfo(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getMovieDetailes();
  }, [movieId]);

  const [clickedToWatch, setClickedToWatch] = useState(() => {
    const savedValue = localStorage.getItem("toWatch");
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return false;
  });

  const handleToWatchClick = (name, id) => {
    // localStorage.setItem(`selectedFilm: ${filmId}`, movieInfo.title);
    setClickedToWatch((prevToWatch) => {
      const prevToWatchFromLocalStorage =
        JSON.parse(localStorage.getItem("toWatch")) || {};

      const updatedtoWatch = {
        ...prevToWatch,
        [name]: !prevToWatch[name],
      };

      if (updatedtoWatch[name]) {
        prevToWatchFromLocalStorage[name] = { name, id, gen: "tv" };
      } else {
        delete prevToWatchFromLocalStorage[name];
      }

      localStorage.setItem(
        "toWatch",
        JSON.stringify(prevToWatchFromLocalStorage)
      );
      return updatedtoWatch;
    });
  };
  const [isLiked, setIsLiked] = useState(() => {
    const savedValue = localStorage.getItem("likes");
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return false;
  });
  const handleLikeClick = (name, id) => {
    setIsLiked((prevIsLiked) => {
      const prevIsLikedFromLocalStorage =
        JSON.parse(localStorage.getItem("likes")) || {};

      const updatedIsLiked = {
        ...prevIsLiked,
        [name]: !prevIsLiked[name],
      };
      if (updatedIsLiked[name]) {
        prevIsLikedFromLocalStorage[name] = { name, id, gen: "tv" };
      } else {
        delete prevIsLikedFromLocalStorage[name];
      }
      localStorage.setItem(
        "likes",
        JSON.stringify(prevIsLikedFromLocalStorage)
      );
      return updatedIsLiked;
    });
  };

  useEffect(() => {
    async function getGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getGenres();
  }, []);

  const getGenreNames = (movieInfo) => {
    console.log(genres);
    return genres
      .filter((genre) =>
        movieInfo.genres.some((movieGenre) => movieGenre.id === genre.id)
      )
      .map((genre) => genre.name)
      .join(", ");
  };

  return (
    <>
      <Link to={backLinkUrlRef.current} className={css.goBack}>
        Go Back
      </Link>
      {movieInfo && (
        <div className={css.movieContainer}>
          <div className={css.genInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
              width="300"
            />
            <div>
              <h3 className={css.title}>{movieInfo.name}</h3>
              <p className={css.tagline}>{movieInfo.tagline}</p>
              <p className={css.text}>
                User Score: <span>{movieInfo.vote_average}</span>
              </p>
              <p className={css.text}>
                Status: <span>{movieInfo.status}</span>
              </p>
              <p className={css.text}>
                Number of Seasons: <span>{movieInfo.number_of_seasons}</span>
              </p>
              <p className={css.text}>
                Number of Episodes: <span>{movieInfo.number_of_episodes}</span>
              </p>

              <h4>Overview</h4>
              <p>{movieInfo.overview}</p>
              <h4>Genres</h4>
              <p>{getGenreNames(movieInfo)}</p>
              <div className={css.containerBtn}>
                <button
                  type="button"
                  className={css.filmBtn}
                  onClick={() => handleLikeClick(movieInfo.name, movieInfo.id)}
                >
                  I loved it{" "}
                  <ImHeart
                    className={clsx(
                      isLiked[movieInfo.name] ? css.isLiked : css.notLiked
                    )}
                  />
                </button>
                <button
                  type="button"
                  className={css.filmBtn}
                  onClick={() =>
                    handleToWatchClick(movieInfo.name, movieInfo.id)
                  }
                >
                  Would like to watch{" "}
                  <ImForward3
                    // onClick={() => handleToWatchClick(movieInfo.name)}
                    className={clsx(
                      clickedToWatch[movieInfo.name]
                        ? css.isLiked
                        : css.notLiked
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={css.addInfo}>
            <p className={css.addPar}>Additional information</p>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Please wait, page is loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
