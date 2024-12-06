import { useMemo } from "react";
import MovieList from "./MovieList";
import MovieItem from "./MovieItem";
import { useFavorites } from "../../hooks/useFavorites";
import Button from "../common/Button";
import styled from "styled-components";

const RemoveAllContainer = styled.aside`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  font-size: 0.9em;
`;

export default function Favorites() {
  const { favorites, removeAllFavorites } = useFavorites();

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
      <RemoveAllContainer>
        <Button
          onClick={() => {
            if (confirm("Are you sure you want to remove all favorites?")) removeAllFavorites();
          }}
        >
          Remove all favorites
        </Button>
      </RemoveAllContainer>
    </div>
  );
}
