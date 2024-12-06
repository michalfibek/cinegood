import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";

// hooks
import { useFetchMovie } from "./hooks/useFetchMovie";

// layout
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

// common
import Overlay from "./components/common/Overlay";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import Button from "./components/common/Button";
import PageTitle from "./components/common/PageTitle";

// movie related
import MovieDetail from "./components/movie/MovieDetail";

import { ChevronLeft as ChevronLeftIcon } from "@styled-icons/heroicons-solid";

const Nav = styled.nav`
  display: block;
  margin: 0 0 1rem;
`;

export default function Movie() {
  const { search } = useLocation();
  const { id } = useParams();
  const { movie, loading, error } = useFetchMovie(id || null);

  return (
    <>
      <PageTitle title={movie?.title ?? ""} />
      <Header />
      <MainContent>
        <Nav>
          <Button to={`/${search}`}>
            <ChevronLeftIcon size={24} />
            {search ? `Back to search` : `Back to homepage`}
          </Button>
        </Nav>
        {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}

        {loading && !error.length && (
          <Overlay>
            <Loader>Loading movie...</Loader>
          </Overlay>
        )}
        {movie && <MovieDetail movie={movie} />}
      </MainContent>
    </>
  );
}
