import { fetchGenres, fetchMovieDetails } from "../../request-api.js";
import { useState, useEffect, useRef, Suspense } from "react";
import { ImHeart, ImForward3 } from "react-icons/im";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [genres, setGenres] = useState([]);
  const [movieInfo, setmovieInfo] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedFilmId, setClickedFilmId] = useState(null);

  const location = useLocation();
  console.log(location);
  const backLinkUrlRef = useRef(location.state || "/movies");
  console.log(backLinkUrlRef);

  useEffect(() => {
    async function getMovieDetailes() {
      try {
        const data = await fetchMovieDetails(movieId);
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

  const handleToWatchClick = (filmId) => {
    localStorage.setItem(`selectedFilm: ${filmId}`, movieInfo.title);
    setClickedToWatch((prevToWatch) => {
      const updatedtoWatch = {
        ...prevToWatch,
        [filmId]: !prevToWatch[filmId],
      };
      for (const key in updatedtoWatch) {
        if (!updatedtoWatch[key]) {
          delete updatedtoWatch[key];
        }
      }
      localStorage.setItem("toWatch", JSON.stringify(updatedtoWatch));
      return updatedtoWatch;
    });
  };
  const [isLiked, setIsLiked] = useState(() => {
    const savedValue = localStorage.getItem("likedFilms");
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return false;
  });
  const handleLikeClick = (filmId) => {
    setIsLiked((prevIsLiked) => {
      const updatedIsLiked = {
        ...prevIsLiked,
        [filmId]: !prevIsLiked[filmId],
      };
      for (const qwe in updatedIsLiked) {
        if (!updatedIsLiked[qwe]) {
          delete updatedIsLiked[qwe];
        }
      }

      localStorage.setItem("likedFilms", JSON.stringify(updatedIsLiked));
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
      <Link to={backLinkUrlRef.current}>Go Back</Link>
      {movieInfo && (
        <>
          <p>MovieInfo: {movieInfo.title}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
            width="200"
          />
          <h3>{movieInfo.original_title}</h3>
          <p>User Score: {movieInfo.vote_average}</p>
          <h4>Overview</h4>
          <p>{movieInfo.overview}</p>
          <h4>Genres</h4>
          <p>{getGenreNames(movieInfo)}</p>
          <button
            type="button"
            className={css.filmBtn}
            onClick={() => handleLikeClick(movieId)}
          >
            I loved it{" "}
            <ImHeart
              className={clsx(isLiked[movieId] ? css.isLiked : css.notLiked)}
            />
          </button>
          <button type="button" onClick={() => handleToWatchClick(movieId)}>
            Would like to watch{" "}
            <ImForward3
              onClick={() => handleToWatchClick(movieId)}
              className={clsx(
                clickedToWatch[movieId] ? css.isLiked : css.notLiked
              )}
            />
          </button>
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Suspense fallback={<div>Please wait, page is loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
}
