import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.navContainer}>
      <ul className={css.navigation}>
        <li>
          <NavLink to="/" className={getNavLinkClass}>
            Trending & List
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getNavLinkClass}>
            Search the film
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={getNavLinkClass}>
            About the App
          </NavLink>
        </li>
      </ul>
      <p>by @mercury_paws 🐾</p>
    </nav>
  );
}
