import { useMemo, useState } from "react";
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
import MovieDetail from "./components/movie/MovieDetail";

// hooks
import { useFetchMovies } from "./hooks/useFetchMovies";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ResultsContainer = styled.div`
  margin: 4rem 0 0;
  position: relative;
`;

const itemsPerPage = 10;

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  const { movies, totalResults, error, loading } = useFetchMovies(searchText, currentPage);

  function handleSearchTextChange(text: string) {
    setSearchText(text);
    setCurrentPage(1);
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleMovieSelect(movieId: string) {
    setSelectedMovieId(movieId);
  }

  const movieItems = useMemo(
    () => movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />),
    [movies],
  );

  const memoizedPaginator = useMemo(
    () => (
      <Paginator
        totalCount={totalResults}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    ),
    [totalResults, currentPage],
  );

  return (
    <>
      <AppContainer>
        <Header />
        <MainContent>
          <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
          {/* {selectedMovieId && <MovieDetail movie={mockMovies[0]} />} */}
          <ResultsContainer>
            {error.length > 0 && searchText.length >= import.meta.env.VITE_MIN_SEARCH_LENGTH && (
              <h2>{error}</h2>
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
                    <MovieList count={totalResults} loading={loading}>
                      {movieItems}
                    </MovieList>
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
