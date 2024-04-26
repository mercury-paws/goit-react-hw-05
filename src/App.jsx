import { useEffect, useState } from "react";
import { fetchTrendingFilms } from "./request-api";

export default function App() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function getTrendingFilms() {
      try {
        const data = await fetchTrendingFilms();
        setTrendingFilms(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getTrendingFilms();
  }, []);

  const handleImageClick = () => {
    console.log(event.target);
    setIsClicked(true);
  };

  return (
    <>
      <div>
        <button type="button">Home</button>
        <button type="button">Movies</button>
      </div>
      <h1>Trending today</h1>
      <ul>
        {trendingFilms.map((film) => (
          <li key={film.id}>
            <div>
              {
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  width="200"
                  onClick={handleImageClick}
                />
              }
              {isClicked && <p>{film.overview}</p>}
              {film.original_title}
              {film.vote_average}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
