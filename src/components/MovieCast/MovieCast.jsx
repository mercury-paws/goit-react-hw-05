import { useEffect, useState } from "react";
import { fetchCast } from "../../request-api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchCast(movieId);
        setCast(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getCast();
  }, [movieId]);

  console.log(cast);
  return (
    <>
      <p>Cast: </p>
      {cast.length > 0 ? (
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
      ) : (
        "No actors"
      )}
    </>
  );
}
