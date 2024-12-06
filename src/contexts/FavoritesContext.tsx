import { createContext } from "react";
import { TBasicMovie } from "../types/TBasicMovie";
import { TMovie } from "../types/TMovie";

export type FavoritesContextType = {
  favorites: TBasicMovie[];
  addFavorite: (movie: TBasicMovie | TMovie) => void;
  removeFavorite: (movieId: string) => void;
  checkFavorite: (movieId: string) => boolean;
  removeAllFavorites: () => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
