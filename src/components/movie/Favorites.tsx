import { useMemo } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorage";
import { TBasicMovie } from "../../types/TBasicMovie";
import MovieList from "./MovieList";
import MovieItem from "./MovieItem";

export default function Favorites() {
  const [favorites] = useLocalStorageState<TBasicMovie[]>([], "favorites");

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
