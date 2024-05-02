import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>Sorry, page not found!</p>
      <p>
        Please return to the <Link to="/">Home Page</Link>
      </p>
    </div>
  );
}
