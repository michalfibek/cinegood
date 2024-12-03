import { useState } from "react";
import styled from "styled-components";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
import SearchBar from "./components/common/SearchBar";
import { TMovie } from "./types/movie";
import MovieDetail from "./components/movie/MovieDetail";
import { useFetchMovies } from "./hooks/useFetchMovies";
import Loader from "./components/common/Loader";
import Overlay from "./components/common/Overlay";

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

function App() {
  // const [movies, setMovies] = useState<TMovie[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, error, loading } = useFetchMovies(searchText);

  function handleSearchTextChange(text: string) {
    setSearchText(text);
  }

  return (
    <>
      <AppContainer>
        <Header />
        <MainContent>
          <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
          {/* {selectedMovieId && <MovieDetail movie={mockMovies[0]} />} */}
          <ResultsContainer>
            {searchText.length >= import.meta.env.VITE_MIN_SEARCH_LENGTH && (
              <>
                {loading && (
                  <Overlay>
                    <Loader>Loading movies...</Loader>
                  </Overlay>
                )}
                <MovieList count={movies.length} loading={loading}>
                  {movies?.length > 0 &&
                    movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />)}
                </MovieList>
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
