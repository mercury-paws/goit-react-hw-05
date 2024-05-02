import { useEffect, useState } from "react";
import { fetchReviews } from "../../request-api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchReviews(movieId);
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
            <li key={review.id}>
              <div>
                <p>Author: {review.author}</p>
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
