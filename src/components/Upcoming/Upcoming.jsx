import { fetchUpcoming } from "../../request-api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import css from "./Upcoming.module.css";
import { Link } from "react-router-dom";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);

  const location = useLocation();
  console.log("location:", location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function searchingUpcoming() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchUpcoming();
        setUpcoming(data);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
        console.log("smth was done");
      }
    }
    searchingUpcoming();
  }, []);

  return (
    <div className={css.upcomingContainer}>
      <b className={css.search}>Upcoming films</b>
      {loading && <b>Loading page...</b>}
      {error && <b>Seems that there are no upcoming films..</b>}
      <ul className={css.upcomingList}>
        {upcoming
          .sort((a, b) => {
            const yearA = parseInt(a.release_date.substring(0, 4));
            const yearB = parseInt(b.release_date.substring(0, 4));
            return yearB - yearA;
          })
          .map((movie) => (
            <li key={movie.id} className={css.upcomingItem}>
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
            </li>
          ))}
      </ul>
    </div>
  );
}
