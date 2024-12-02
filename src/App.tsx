// import { useState } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MovieItem from "./components/movie/MovieItem";
import MovieList from "./components/movie/MovieList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { TMovie } from "./types/movie";
import MovieDetail from "./components/movie/MovieDetail";

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
      <Header />
      {selectedMovieId && <MovieDetail movie={mockMovies[0]} />}
      <SearchBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      />
      <MovieList>
        {movies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </MovieList>
      <Footer />
    </>
  );
}

export default App;
