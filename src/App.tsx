import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
import SearchBar from "./components/common/SearchBar";
import { TMovie } from "./types/movie";
import MovieDetail from "./components/movie/MovieDetail";

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

const mockMovies = [
  {
    title: "The Godfather",
    year: 1972,
    runtime: 175,
    imdbID: "tt0068646",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    runtime: 142,
    imdbID: "tt0111161",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    runtime: 152,
    imdbID: "tt0468569",
  },
];

function App() {
  const [movies, setMovies] = useState<TMovie[]>(mockMovies);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSearchTextChange(text: string) {
    setSearchText(text);
  }

  return (
    <>
      <AppContainer>
        <Header />
        <MainContent>
          <SearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
          {selectedMovieId && <MovieDetail movie={mockMovies[0]} />}
          <MovieList>
            {movies.map((movie) => (
              <MovieItem key={movie.imdbID} movie={movie} />
            ))}
          </MovieList>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
