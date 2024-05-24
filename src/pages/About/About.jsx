import css from "./About.module.css";
export default function About() {
  return (
    <>
      <h1>Hello there!🤗❤</h1>
      <h3>
        Welcome to the hands-on FilmApp! I am @mercury_paws 🐾 and this is my
        first React App. Here are some it's features:
      </h3>
      <ul className={css.list}>
        <li>
          The App fetches the latest trending films from an external API to keep
          us updated with popular movies.
        </li>
        <li>
          Users can search for specific films using the search functionality.
        </li>
        <li>
          The detailed information about the films can also be found upon
          different film-links.
        </li>
        <li>
          Users can make a list of "liked" and "to watch" films. The lists will
          be displayed of the Home page.
        </li>
        <li>
          Both the liked films and the watchlist are stored in the user's local
          storage, ensuring data persistence across sessions. However, if the
          broser history is cleaned up, the information safed in the lists will
          be lost.
        </li>
      </ul>
    </>
  );
}
