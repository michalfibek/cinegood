// import { useCallback, useEffect, useMemo, useState } from "react";
// import styled from "styled-components";

// layout
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

// movie related
import MovieDetail from "./components/movie/MovieDetail";
import { useFetchMovie } from "./hooks/useFetchMovie";
import { useParams } from "react-router";
import Overlay from "./components/common/Overlay";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";

export default function Movie() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const { movie, loading, error } = useFetchMovie(id || null);

  return (
    <>
      <Header />
      <MainContent>
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
