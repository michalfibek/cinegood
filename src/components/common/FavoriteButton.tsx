import styled, { keyframes } from "styled-components";
import { TBasicMovie } from "../../types/TBasicMovie";
import Button from "./Button";
import { Star as StarIcon } from "@styled-icons/heroicons-solid";
import { TMovie } from "../../types/TMovie";
import { useFavorites } from "../../hooks/useFavorites";
import { useEffect, useState } from "react";

const animAdd = keyframes`
  0% {
    transform: scale(1);
  }
  50% { 
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const animRemove = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
    color: #f32112;
  }
  100% { 
    transform: scale(.75);
    opacity: 0;
    color: #f32112;
  }
`;

const FavoriteButtonElm = styled(Button)`
  opacity: 0.5;
  z-index: 1;
  background: none;
  border: none;
  color: #757575;
  align-self: flex-start;
  background: none;
  outline: none;
  padding: 0;
  transition:
    color 0.2s,
    opacity 0.2s,
    transform 0.1s;

  &:focus,
  &:active,
  &:hover {
    outline: none;
    background: none;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  &.active {
    background: none;
    color: #f39c12;
  }

  &.just-added {
    svg {
      animation: ${animAdd} 0.3s ease-out;
    }
  }
  &.just-removed {
    svg {
      animation: ${animRemove} 0.3s ease-in-out;
    }
  }
`;

type TStateChanged = "" | "ADDED" | "REMOVED";

export default function FavoriteButton({ movie }: { movie: TBasicMovie | TMovie }) {
  const { checkFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = checkFavorite(movie.imdbID);

  const [stateChange, setStateChange] = useState<TStateChanged>("");

  const handleSwitchFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
      setStateChange("REMOVED");
    } else {
      addFavorite(movie);
      setStateChange("ADDED");
    }
  };
  useEffect(() => {
    if (stateChange) {
      const timer = setTimeout(() => setStateChange(""), 500);
      return () => clearTimeout(timer);
    }
  }, [stateChange]);

  let stateClass = "";

  if (stateChange == "ADDED") {
    stateClass = "just-added";
  }
  if (stateChange == "REMOVED") {
    stateClass = "just-removed";
  }

  return (
    <FavoriteButtonElm
      onClick={handleSwitchFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`${isFavorite ? "active" : ""} ${stateClass}`}
    >
      <StarIcon size={32} />
    </FavoriteButtonElm>
  );
}
