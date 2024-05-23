import { useEffect, useState } from "react";
import { fetchImages } from "../../request-api";
import { useParams } from "react-router-dom";
import css from "./Images.module.css";

export default function Images() {
  const { movieId } = useParams();

  const [images, setImages] = useState([]);
  useEffect(() => {
    async function getImages() {
      try {
        const data = await fetchImages(movieId);
        setImages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getImages();
  }, [movieId]);

  console.log(images);
  return (
    <>
      <p>Images: </p>
      {images.length > 0 ? (
        <ul className={css.list}>
          {images.map((image) => (
            <li key={image.file_path} className={css.cardItem}>
              {image.profile_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  width="180"
                />
              ) : (
                <p className={css.noPhoto}>No Photo</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        "No images"
      )}
    </>
  );
}
