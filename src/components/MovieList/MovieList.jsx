import { Link } from "react-router-dom";
export default function MovieList({ movie }) {
  return (
    <>
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      <p>Year: {movie.release_date.slice(0, 4)}</p>
      <p>Average Vote: {movie.vote_average}</p>
    </>
  );
}
