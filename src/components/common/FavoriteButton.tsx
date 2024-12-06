import styled from "styled-components";
import { TBasicMovie } from "../../types/TBasicMovie";
import Button from "./Button";
import { Star as StarIcon } from "@styled-icons/heroicons-solid";
import { TMovie } from "../../types/TMovie";
import { useFavoriteMovies } from "../../hooks/useFavoriteMovies";

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
  const { checkFavorite, addFavorite, removeFavorite } = useFavoriteMovies();
  const isFavorite = checkFavorite(movie.imdbID);

  const handleSwitchFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
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
