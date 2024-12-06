// import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";

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

// movie related
import MovieDetail from "./components/movie/MovieDetail";

import { ChevronLeft as ChevronLeftIcon } from "@styled-icons/heroicons-solid";

const Nav = styled.nav`
  display: block;
  margin: 0 0 1rem;
`;

export default function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movie, loading, error } = useFetchMovie(id || null);

  return (
    <>
      <Header />
      <MainContent>
        <Nav>
          <Button onClick={() => navigate(-1)}>
            <ChevronLeftIcon size={24} /> Back to search
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
