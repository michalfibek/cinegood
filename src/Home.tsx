import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

// hooks
import { useSearchMovies } from "./hooks/useSearchMovies";
import { useDebounce } from "./hooks/useDebounce";

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
import PageTitle from "./components/common/PageTitle";

// movie related
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
import Favorites from "./components/movie/Favorites";

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

  const searchActive = searchText.length >= import.meta.env.VITE_MIN_SEARCH_LENGTH;

  const { movies, totalResults, error, loading } = useSearchMovies(
    debouncedSearchText,
    currentPage,
  );

  function handleSearchTextChange(text: string) {
    setSearchText(text);
    setCurrentPage(1);
  }

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    let newParams;

    if (debouncedSearchText.trim() === "") {
      newParams = {};
    } else if (currentPage === 1) {
      newParams = { q: debouncedSearchText };
    } else {
      newParams = { q: debouncedSearchText, p: currentPage.toString() };
    }

    const differentParams =
      Object.keys(newParams).length !== Object.keys(currentParams).length ||
      Object.keys(newParams).some(
        (key) =>
          (newParams as Record<string, string>)[key] !==
          (currentParams as Record<string, string>)[key],
      );
    if (differentParams) {
      setSearchParams(newParams, { replace: true });
    }
  }, [debouncedSearchText, currentPage, searchParams, setSearchParams]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const movieItems = useMemo(
    () => movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />),
    [movies],
  );

  const pageTitle = debouncedSearchText.trim() === "" ? "" : `searching '${debouncedSearchText}'`;

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
      <PageTitle title={pageTitle} />
      <Header>
        <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
      </Header>
      <MainContent>
        <ResultsContainer>
          {error.length > 0 && searchActive && <ErrorMessage>{error}</ErrorMessage>}

          {searchActive && (
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
        {!searchActive && <Favorites />}
      </MainContent>
    </>
  );
}
