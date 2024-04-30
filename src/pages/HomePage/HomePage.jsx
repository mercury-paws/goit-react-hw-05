import { useEffect, useState } from "react";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import { ImHeart, ImForward3 } from "react-icons/im";
import css from "./HomePage.module.css";
import { clsx } from "clsx";

export default function HomePage({ trendingFilms, genres }) {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedToWatch, setClickedToWatch] = useState(false);
  const [clickedFilmId, setClickedFilmId] = useState(null);

  const [isLiked, setIsLiked] = useState(() => {
    const savedValue = localStorage.getItem("likedFilms");
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return false;
  });

  const handleImageClick = (filmId) => {
    console.log(event.target);
    setIsClicked((prevState) => !prevState);
    setClickedFilmId(filmId);
  };
  const handleToWatchClick = (film, filmId) => {
    localStorage.setItem(`selectedFilm: ${filmId}`, film.title);
    setClickedToWatch((prevToWatch) => {
      const updatedtoWatch = {
        ...prevToWatch,
        [filmId]: !prevToWatch[filmId],
      };
      for (const qwe in updatedtoWatch) {
        if (!updatedtoWatch[qwe]) {
          delete updatedtoWatch[qwe];
        }
      }
      localStorage.setItem("toWatch", JSON.stringify(updatedtoWatch));
      return updatedtoWatch;
    });
  };

  const handleLikeClick = (film, filmId) => {
    console.log(filmId);
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

  return (
    <>
      <h1>Trending today</h1>
      <ol>
        {trendingFilms
          .sort((a, b) => b.vote_average - a.vote_average)
          .map((film) => (
            <li
              key={film.id}
              className={clsx(
                clickedToWatch[film.id] ? css.istowatch : css.nottowatch
              )}
            >
              <div>
                {
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    width="40"
                    onClick={() => handleImageClick(film.id)}
                  />
                }
                {isClicked && clickedFilmId === film.id ? (
                  <MovieDetailsPage film={film} genres={genres} />
                ) : (
                  //   <p>{film.overview}</p>
                  <></>
                )}
                <p
                  onClick={() => handleToWatchClick(film, film.id)}
                  className={clsx(
                    clickedToWatch[film.id] ? css.isLiked : css.notLiked
                  )}
                >
                  Title: {film.title}
                </p>
                <p>Average Vote: {film.vote_average}</p>
                <p>
                  I loved it{" "}
                  <ImHeart
                    onClick={() => handleLikeClick(film, film.id)}
                    className={clsx(
                      isLiked[film.id] ? css.isLiked : css.notLiked
                    )}
                  />
                </p>
                <p>
                  Would like to watch{" "}
                  <ImForward3
                    onClick={() => handleToWatchClick(film, film.id)}
                    className={clsx(
                      clickedToWatch[film.id] ? css.isLiked : css.notLiked
                    )}
                  />
                </p>
              </div>
            </li>
          ))}
      </ol>
    </>
  );
}
