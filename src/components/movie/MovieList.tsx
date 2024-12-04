import React from "react";
import styled from "styled-components";

const StyledMovieList = styled.div<{ $loading: boolean }>`
  transition: opacity 0.2s;
  opacity: ${({ $loading }) => ($loading ? 0.2 : 1)};
`;

const MovieListing = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem 2rem;
`;

export default function MovieList({
  count,
  children,
  loading = false,
}: {
  count: number;
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <StyledMovieList $loading={loading}>
      <MovieListing>{children}</MovieListing>
    </StyledMovieList>
  );
}
