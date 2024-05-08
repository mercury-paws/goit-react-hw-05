import { useEffect, useState } from "react";
import { fetchTVReviews } from "../../request-api";
import { useParams } from "react-router-dom";
import css from "./TVReviews.module.css";

export default function TVReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchTVReviews(movieId);
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getReviews();
  }, [movieId]);
  console.log(reviews);
  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <div>
                <p className={css.author}>Author: {review.author}</p>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        "No reviews yet"
      )}
    </>
  );
}
