import { useMemo } from "react";
import MovieList from "./MovieList";
import MovieItem from "./MovieItem";
import { useFavoriteMovies } from "../../hooks/useFavoriteMovies";

export default function Favorites() {
  const { favorites } = useFavoriteMovies();

  const movieItems = useMemo(
    () => favorites.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />),
    [favorites],
  );

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Favorites</h2>
      <MovieList loading={false}>{movieItems}</MovieList>
    </div>
  );
}
