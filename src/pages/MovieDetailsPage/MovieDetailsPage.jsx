// import { fetchGenres, fetchMovieInfo } from "../../request-api.js";
// import { useState, useEffect } from "react";
// import { ImHeart, ImForward3 } from "react-icons/im";
// import { clsx } from "clsx";
// import { css } from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  //   const [genres, setGenres] = useState([]);
  //   const [movieInfo, setmovieInfo] = useState([]);
  //   const [isClicked, setIsClicked] = useState(false);
  //   const [clickedToWatch, setClickedToWatch] = useState(false);
  //   const [clickedFilmId, setClickedFilmId] = useState(null);

  //   const handleToWatchClick = (film, filmId) => {
  //     localStorage.setItem(`selectedFilm: ${filmId}`, film.title);
  //     setClickedToWatch((prevToWatch) => {
  //       const updatedtoWatch = {
  //         ...prevToWatch,
  //         [filmId]: !prevToWatch[filmId],
  //       };
  //       for (const qwe in updatedtoWatch) {
  //         if (!updatedtoWatch[qwe]) {
  //           delete updatedtoWatch[qwe];
  //         }
  //       }
  //       localStorage.setItem("toWatch", JSON.stringify(updatedtoWatch));
  //       return updatedtoWatch;
  //     });
  //   };
  //   const [isLiked, setIsLiked] = useState(() => {
  //     const savedValue = localStorage.getItem("likedFilms");
  //     if (savedValue !== null) {
  //       return JSON.parse(savedValue);
  //     }
  //     return false;
  //   });
  //   const handleLikeClick = (film, filmId) => {
  //     console.log(filmId);
  //     setIsLiked((prevIsLiked) => {
  //       const updatedIsLiked = {
  //         ...prevIsLiked,
  //         [filmId]: !prevIsLiked[filmId],
  //       };
  //       for (const qwe in updatedIsLiked) {
  //         if (!updatedIsLiked[qwe]) {
  //           delete updatedIsLiked[qwe];
  //         }
  //       }
  //       localStorage.setItem("likedFilms", JSON.stringify(updatedIsLiked));
  //       return updatedIsLiked;
  //     });
  //   };

  //   useEffect(() => {
  //     async function getMovieInfo(movie_id) {
  //       try {
  //         const data = await fetchMovieInfo(movie_id);
  //         setmovieInfo(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         console.log("smth was done");
  //       }
  //     }
  //     getMovieInfo(651212);
  //   }, []);

  //   async function getGenres() {
  //     try {
  //       const data = await fetchGenres();
  //       setGenres(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       console.log("smth was done");
  //     }
  //   }

  //   const getGenreNames = () => {
  //     console.log(genres);
  //     return genres
  //       .filter((genre) => film.genre_ids.includes(genre.id))
  //       .map((genre) => genre.name)
  //       .join(", ");
  //   };

  return (
    <>
      <p>MovieDetailsPage: {movieId}</p>
    </>
  );
}
//       <button>Go Back</button>
//       <img
//         src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
//         width="200"
//       />
//       <h3>{film.original_title}</h3>
//       <p>User Score: {film.vote_average}</p>
//       <h4>Overview</h4>
//       <p>{film.overview}</p>
//       <h4>Genres</h4>
//       <p>{getGenreNames()}</p>
//       <button
//         type="button"
//         className={css.filmBtn}
//         onClick={() => handleLikeClick(film, film.id)}
//       >
//         I loved it{" "}
//         <ImHeart
//           className={clsx(isLiked[film.id] ? css.isLiked : css.notLiked)}
//         />
//       </button>
//       <button type="button" onClick={() => handleToWatchClick(film, film.id)}>
//         Would like to watch{" "}
//         <ImForward3
//           onClick={() => handleToWatchClick(film, film.id)}
//           className={clsx(clickedToWatch[film.id] ? css.isLiked : css.notLiked)}
//         />
//       </button>
//       <p>Additional information</p>
//       <p>Cast</p>
//       <p>Reviews</p>
//     </>
//   );
// }
