import { useEffect, useState } from "react";
import { fetchReviews } from "../../request-api";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchReviews(693134);
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("smth was done");
      }
    }
    getReviews();
  }, []);
  console.log(reviews);
  return (
    <>
      <p>Cast: </p>
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
    </>
  );
}
