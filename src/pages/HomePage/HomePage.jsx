import { useEffect, useState } from "react";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import { ImHeart } from "react-icons/im";
import css from "./HomePage.module.css";
import { clsx } from "clsx";

export default function HomePage({ trendingFilms, genres }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState({});
  const [clickedFilmId, setClickedFilmId] = useState(null);

  // useEffect(() => {
  //   const storedLikedFilms = localStorage.getItem("isLiked");
  //   if (isLiked) {
  //     setIsLiked(JSON.parse(storedLikedFilms));
  //   }
  // }, []);

  const handleImageClick = (filmId) => {
    console.log(event.target);
    setIsClicked((prevState) => !prevState);
    setClickedFilmId(filmId);
  };

  const handleLikeClick = (film, filmId) => {
    localStorage.setItem(`selectedFilm: ${filmId}`, film.original_title);
    console.log(filmId);
    setIsLiked((prevIsLiked) => ({
      ...prevIsLiked,
      [filmId]: !prevIsLiked[filmId],
    }));
    localStorage.setItem("likedFilms", JSON.stringify(isLiked));
  };

  return (
    <>
      <h1>Trending today</h1>
      <ol>
        {trendingFilms
          .sort((a, b) => b.vote_average - a.vote_average)
          .map((film) => (
            <li key={film.id}>
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
                <p>Title: {film.original_title}</p>
                <p>Average Vote: {film.vote_average}</p>
                <ImHeart
                  onClick={() => handleLikeClick(film, film.id)}
                  className={clsx(
                    isLiked[film.id] ? css.isLiked : css.notLiked
                  )}
                />
              </div>
            </li>
          ))}
      </ol>
    </>
  );
}
