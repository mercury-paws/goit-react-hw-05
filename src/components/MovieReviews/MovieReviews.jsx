export default function MovieReviews({ reviews }) {
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
