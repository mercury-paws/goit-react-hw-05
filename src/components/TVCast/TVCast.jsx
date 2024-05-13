import { useEffect, useState } from "react";
import { fetchTVCast } from "../../request-api";
import { useParams } from "react-router-dom";
import css from "./TVCast.module.css";

export default function TVCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchTVCast(movieId);
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
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.cardItem}>
              {actor.profile_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  width="90"
                />
              ) : (
                <p className={css.noPhoto}>No Photo</p>
              )}
              <div>
                <p>{actor.original_name}</p>
                {/* <p>Character: {actor.character}</p> */}
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
