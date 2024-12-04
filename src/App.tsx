import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

// basic layout
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

// common
import Loader from "./components/common/Loader";
import Overlay from "./components/common/Overlay";
import Paginator from "./components/common/Paginator";
import SearchBar from "./components/common/SearchBar";

// movie related
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
// import MovieDetail from "./components/movie/MovieDetail";

// hooks
import { useFetchMovies } from "./hooks/useFetchMovies";
import useDebounce from "./hooks/useDebounce";
import { useSearchParams } from "react-router";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ResultsContainer = styled.div`
  margin: 2rem 0 0;
  position: relative;
`;

const ResultsCount = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const itemsPerPage = 10;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchText = searchParams.get("q") || "";
  const pageParam = searchParams.get("p");
  const initialPage = pageParam ? parseInt(pageParam) : 1;

  const [searchText, setSearchText] = useState(initialSearchText);
  const [currentPage, setCurrentPage] = useState(initialPage);
  // const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  const debouncedSearchText = useDebounce(searchText, 500);

  const { movies, totalResults, error, loading } = useFetchMovies(debouncedSearchText, currentPage);

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

  if (import.meta.env.VITE_OMDB_API_KEY === undefined) {
    return (
      <ErrorMessage>
        Please enter your OMDB API key into the configuration file to start using this app.
      </ErrorMessage>
    );
  }

  return (
    <>
      <AppContainer>
        <Header>
          <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
        </Header>
        <MainContent>
          {/* {selectedMovieId && <MovieDetail movie={mockMovies[0]} />} */}
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
                {movies?.length > 0 && (
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
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
