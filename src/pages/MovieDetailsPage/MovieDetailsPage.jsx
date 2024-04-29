export default function MovieDetailsPage({ film, genres }) {
  const getGenreNames = () => {
    console.log(genres);
    return genres
      .filter((genre) => film.genre_ids.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  return (
    <>
      <button>Go Back</button>
      <img
        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
        width="200"
      />
      <h3>{film.original_title}</h3>
      <p>User Score: {film.vote_average}</p>
      <h4>Overview</h4>
      <p>{film.overview}</p>
      <h4>Genres</h4>
      <p>{getGenreNames()}</p>
      <p>Additional information</p>
      <p>Cast</p>
      <p>Reviews</p>
    </>
  );
}
