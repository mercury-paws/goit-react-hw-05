import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.isActive);
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.isActive);
            }}
          >
            MoviesPage
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies/:movieId">MovieDetailsPage</NavLink>
        </li>
        <li>
          <NavLink to="/movies/:movieId/cast">MovieCast</NavLink>
        </li>
        <li>
          <NavLink to="/movies/:movieId/reviews">MovieReviews</NavLink>
        </li>
      </ul>
    </nav>
  );
}
