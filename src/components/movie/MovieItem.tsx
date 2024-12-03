import styled from "styled-components";
import { TMovie } from "../../types/movie";
import { Img } from "../common/Img";

const StyledMovieItem = styled.div`
  line-height: 1.2;

  img {
    width: auto;
    height: 5rem;
    border-radius: 0.25rem;
    transition: transform 0.2s;
  }

  > a {
    display: flex;
    border-radius: 0.5rem;
    padding: 0.25rem 0.25rem 0.25rem 0;

    &:hover,
    &:focus,
    &:active {
      background: #3f3f3f;
      img {
        transform: scale(1.2);
      }
    }
  }
`;

const MovieHeader = styled.div`
  margin-left: 1rem;

  a {
    margin: 0;
  }
`;

const MovieTitle = styled.h3`
  margin: 0 0 0.5rem;
  /* text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap; */
`;

const FallbackImg = styled.div`
  display: block;
  width: 3.5rem;
  height: 5rem;
  background: #3f3f3f;
  border-radius: 0.25rem;
`;

export default function MovieItem({ movie }: { movie: TMovie }) {
  const url = "#";
  return (
    <StyledMovieItem>
      <a href={url}>
        <Img src={movie.poster} alt={movie.title} fallback={<FallbackImg />} />
        <MovieHeader>
          <MovieTitle>{movie.title}</MovieTitle>
          {movie.director && <p>{movie.director}</p>}
          {movie.year}
        </MovieHeader>
      </a>
    </StyledMovieItem>
  );
}
