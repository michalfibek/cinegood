import React, { ReactNode } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { TBasicMovie } from "../types/TBasicMovie";
import { TMovie } from "../types/TMovie";
import { FavoritesContext } from "../contexts/FavoritesContext";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorageState<TBasicMovie[]>([], "favorites");

  function addFavorite(movie: TBasicMovie | TMovie) {
    const movieBasicData: TBasicMovie = {
      imdbID: movie.imdbID,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      type: movie.type,
    };

    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.imdbID === movieBasicData.imdbID)) {
        return prevFavorites; // already a favorite
      }
      return [...prevFavorites, movieBasicData];
    });
  }

  function removeFavorite(movieId: string) {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.imdbID !== movieId));
  }

  function removeAllFavorites() {
    setFavorites([]);
  }

  function checkFavorite(movieId: string) {
    return favorites.some((fav) => fav.imdbID === movieId);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
    checkFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
