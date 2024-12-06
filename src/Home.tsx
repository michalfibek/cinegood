import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

// hooks
import { useSearchMovies } from "./hooks/useSearchMovies";
import useDebounce from "./hooks/useDebounce";

import styled from "styled-components";

// basic layout
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

// common
import Loader from "./components/common/Loader";
import Overlay from "./components/common/Overlay";
import Paginator from "./components/common/Paginator";
import SearchBar from "./components/common/SearchBar";
import ErrorMessage from "./components/common/ErrorMessage";

// movie related
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
// import MovieDetail from "./components/movie/MovieDetail";

const ResultsContainer = styled.div`
  margin: 2rem 0 0;
  position: relative;
`;

const ResultsCount = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const itemsPerPage = 10;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchText = searchParams.get("q") || "";
  const pageParam = searchParams.get("p");
  const initialPage = pageParam ? parseInt(pageParam) : 1;

  const [searchText, setSearchText] = useState(initialSearchText);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const debouncedSearchText = useDebounce(searchText, 500);

  const { movies, totalResults, error, loading } = useSearchMovies(
    debouncedSearchText,
    currentPage,
  );

  function handleSearchTextChange(text: string) {
    setSearchText(text);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (debouncedSearchText.trim() === "") {
      setSearchParams({});
    } else if (currentPage === 1) {
      setSearchParams({ q: debouncedSearchText });
    } else {
      setSearchParams({ q: debouncedSearchText, p: currentPage.toString() });
    }
  }, [debouncedSearchText, currentPage, setSearchParams]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const movieItems = useMemo(
    () => movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />),
    [movies],
  );

  const memoizedPaginator = useMemo(() => {
    if (totalResults === 0 || totalResults <= itemsPerPage) {
      return null;
    }
    return (
      <Paginator
        totalCount={totalResults}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    );
  }, [totalResults, currentPage, handlePageChange]);

  return (
    <>
      <Header>
        <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
      </Header>
      <MainContent>
        <ResultsContainer>
          {error.length > 0 && searchText.length >= import.meta.env.VITE_MIN_SEARCH_LENGTH && (
            <ErrorMessage>{error}</ErrorMessage>
          )}

          {searchText.length >= import.meta.env.VITE_MIN_SEARCH_LENGTH && (
            <>
              {loading && !error.length && (
                <Overlay>
                  <Loader>Loading movies...</Loader>
                </Overlay>
              )}
              {searchText == debouncedSearchText && movies?.length > 0 && (
                <>
                  <ResultsCount>{totalResults} results</ResultsCount>
                  {memoizedPaginator}
                  <MovieList loading={loading}>{movieItems}</MovieList>
                  {memoizedPaginator}
                </>
              )}
            </>
          )}
        </ResultsContainer>
      </MainContent>
    </>
  );
}
