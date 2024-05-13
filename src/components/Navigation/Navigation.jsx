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
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getNavLinkClass}>
            Search the film
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
