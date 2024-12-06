import { TBasicMovie } from "../types/TBasicMovie";
import { TMovie } from "../types/TMovie";
import { useLocalStorageState } from "./useLocalStorage";

export function useFavoriteMovies() {
  const [favorites, setFavorites] = useLocalStorageState<TBasicMovie[]>([], "favorites");

  const addFavorite = (movie: TBasicMovie | TMovie) => {
    const movieBasicData = {
      imdbID: movie.imdbID,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      type: movie.type,
    } as TBasicMovie;

    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.imdbID === movieBasicData.imdbID)) {
        return prevFavorites;
      }
      return [...prevFavorites, movieBasicData];
    });
  };

  const checkFavorite = (movieId: string) => favorites.some((favMov) => favMov.imdbID === movieId);

  const removeFavorite = (movieId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((prevMov) => prevMov.imdbID !== movieId));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    checkFavorite,
  };
}
