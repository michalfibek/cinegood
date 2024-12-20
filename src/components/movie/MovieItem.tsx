import styled from "styled-components";
import { Img } from "../common/Img";
import { Link, useLocation } from "react-router";
import { TBasicMovie } from "../../types/TBasicMovie";
import FavoriteButton from "../common/FavoriteButton";

const StyledMovieItem = styled.div`
  display: flex;
  line-height: 1.2;
  align-items: center;
  border-radius: 0.5rem;

  img {
    border-radius: 0.25rem;
    width: 3.5rem;
    height: 5rem;
    object-fit: cover;
    transition: transform 0.2s;
  }

  > a {
    display: flex;
    border-radius: 0.5rem;
    padding: 0.25rem 0.25rem 0.25rem 0;
  }

  &:hover,
  &:focus,
  &:active {
    background: #1b1b1b;
    img {
      transform: scale(1.2);
    }
  }
`;

const FavoriteButtonContainer = styled.div`
  margin: 0.5rem;
`;

const MovieHeader = styled.div`
  margin-left: 1rem;
  flex-grow: 1;

  a {
    margin: 0;
  }
`;

const MovieTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #e6fffd;
`;

const FallbackImg = styled.div`
  display: block;
  position: relative;
  width: 3.5rem;
  height: 5rem;
  border-radius: 0.25rem;
  object-fit: fill;
  background: #3f3f3f;
`;

const ImageContainer = styled.div`
  width: 3.5rem;
  height: 5rem;
  display: block;
  position: relative;
`;

const MovieMeta = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MovieType = styled.span`
  &::after {
    content: "•";
    margin-left: 0.5rem;
  }
`;

const MovieYear = styled.time``;

export default function MovieItem({ movie }: { movie: TBasicMovie }) {
  const { search } = useLocation();

  return (
    <StyledMovieItem>
      <Link to={`/movie/${movie.imdbID}${search}`}>
        <ImageContainer>
          <Img src={movie.poster} alt={movie.title} fallback={<FallbackImg />} />
        </ImageContainer>
      </Link>
      <MovieHeader>
        <Link to={`/movie/${movie.imdbID}${search}`}>
          <MovieTitle>{movie.title}</MovieTitle>
        </Link>
        <MovieMeta>
          {movie.type && <MovieType>{movie.type}</MovieType>}
          <MovieYear dateTime={movie.year.toString()}>{movie.year}</MovieYear>
        </MovieMeta>
      </MovieHeader>
      <FavoriteButtonContainer>
        <FavoriteButton movie={movie} />
      </FavoriteButtonContainer>
    </StyledMovieItem>
  );
}
