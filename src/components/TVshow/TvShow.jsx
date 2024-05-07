import { Link, useLocation } from "react-router-dom";
import css from "./TvShow.module.css";
export default function TvShow({ tvshow }) {
  const location = useLocation();

  return (
    <div className={css.movieList}>
      <Link to={`/movies/${tvshow.id}`} state={location}>
        {tvshow.name}
      </Link>
      <p>Year: {tvshow.first_air_date.slice(0, 4)}</p>
      <p>Average Vote: {tvshow.vote_average}</p>
    </div>
  );
}
