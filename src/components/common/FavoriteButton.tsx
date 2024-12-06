import styled from "styled-components";
import { useLocalStorageState } from "../../hooks/useLocalStorage";
import { TBasicMovie } from "../../types/TBasicMovie";
import Button from "./Button";
import { Star as StarIcon } from "@styled-icons/heroicons-solid";
import { TMovie } from "../../types/TMovie";

const FavoriteButtonElm = styled(Button)`
  background: none;
  border: none;
  color: #fff;
  align-self: flex-start;
  background: none;
  outline: none;
  transition: color 0.2s;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover,
  &.active {
    background: none;
    color: #f39c12;
  }
`;

export default function FavoriteButton({ movie }: { movie: TBasicMovie | TMovie }) {
  const [favorites, setFavorites] = useLocalStorageState<TBasicMovie[]>([], "favorites");
  const isFavorite = favorites.find((prevMov) => prevMov.imdbID == movie.imdbID);

  const handleSwitchFavorite = () => {
    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((prevMov) => prevMov.imdbID !== movie.imdbID),
      );
    } else {
      const movieBasicData = {
        imdbID: movie.imdbID,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        type: movie.type,
      } as TBasicMovie;
      setFavorites((prevFavorites) => [...prevFavorites, movieBasicData]);
    }
  };

  return (
    <FavoriteButtonElm
      onClick={handleSwitchFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={isFavorite ? "active" : ""}
    >
      <StarIcon size={32} />
    </FavoriteButtonElm>
  );
}
