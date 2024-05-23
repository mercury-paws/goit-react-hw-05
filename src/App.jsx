import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const TVReviews = lazy(() => import("./components/TVReviews/TVReviews"));
const TVCast = lazy(() => import("./components/TVCast/TVCast"));
const TVDetailsPage = lazy(() => import("./pages/TVDetailsPage/TVDetailsPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const Images = lazy(() => import("./components/Images/Images"));
const MoviePage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<Images />} />
          </Route>
          <Route path="/tv/:movieId" element={<TVDetailsPage />}>
            <Route path="cast" element={<TVCast />} />
            <Route path="reviews" element={<TVReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}
