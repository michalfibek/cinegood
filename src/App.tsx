import styled from "styled-components";
import { Route, Routes } from "react-router";

// basic layout
import Footer from "./components/layout/Footer";

// context provider
import { FavoritesProvider } from "./providers/FavoritesProvider";

// main routed components
import Home from "./Home";
import Movie from "./Movie";
import ErrorMessage from "./components/common/ErrorMessage";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
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
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
          </Routes>
          <Footer />
        </FavoritesProvider>
      </AppContainer>
    </>
  );
}

export default App;
