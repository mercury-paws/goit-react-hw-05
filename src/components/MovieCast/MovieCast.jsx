export default function MovieCast({ cast }) {
  console.log(cast);
  return (
    <>
      <p>Cast: </p>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.profile_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                width="50"
              />
            ) : (
              <p>No Photo</p>
            )}
            <div>
              <p>Name: {actor.original_name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
