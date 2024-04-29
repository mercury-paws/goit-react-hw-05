export default function MovieList({ searchMovie }) {
  const searchingTheFilm = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    searchMovie(query);
  };

  return (
    <>
      <p>searchFiled</p>
      <form onSubmit={searchingTheFilm}>
        <input type="text" name="searchQuery" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
