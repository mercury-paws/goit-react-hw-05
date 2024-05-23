import { Link, useLocation } from "react-router-dom";
import css from "./SerachedFilms.module.css";
export default function SearchedFilms({ movie }) {
  const location = useLocation();

  return (
    <div className={css.movieList}>
      {movie.backdrop_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          width="300"
        />
      ) : (
        <p className={css.noPhoto}>No Photo</p>
      )}
      <Link to={`/movies/${movie.id}`} state={location}>
        {movie.title}
      </Link>
      <p>Year: {movie.release_date.slice(0, 4)}</p>
      <p>Average Vote: {movie.vote_average}</p>
    </div>
  );
}
