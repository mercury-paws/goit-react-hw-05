export default function MovieList({ searchMovie, searchMovieResult }) {
  const searchingTheFilm = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    searchMovie(query);
  };

  return (
    <>
      <p>SearchFiled</p>
      <form onSubmit={searchingTheFilm}>
        <input type="text" name="searchQuery" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchMovieResult
          .sort((a, b) => {
            const yearA = parseInt(a.release_date.substring(0, 4));
            const yearB = parseInt(b.release_date.substring(0, 4));
            return yearB - yearA;
          })
          .map((movie) => (
            <li key={movie.id}>
              <h4>{movie.title}</h4>
              <p>Year: {movie.release_date.slice(0, 4)}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
