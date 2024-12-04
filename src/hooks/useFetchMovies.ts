import { useEffect, useRef, useState } from "react";
import { TMovie } from "../types/movie";
import { TFetchedMovie } from "../types/fetchedMovie";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useFetchMovies(
  searchText: string,
  page: number,
): {
  movies: TMovie[];
  totalResults: number;
  loading: boolean;
  error: string;
} {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  const cache = useRef<{ [key: string]: { movies: TMovie[]; totalResults: number } }>({});

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `${searchText}-${page}`;

    async function fetchMovies() {
      if (cache.current[cacheKey]) {
        const cachedData = cache.current[cacheKey];
        setMovies(cachedData.movies);
        setTotalResults(cachedData.totalResults);
        return;
      }

      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API_URL}?s=${searchText}&page=${page}&apikey=${API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Error fetching the movie");
        const data = await response.json();

        if (data.Response === "False") {
          setMovies([]);
          cache.current[cacheKey] = {
            movies: [],
            totalResults: 0,
          };
          throw new Error("No movie found");
        }
        // console.log("data", data.Search);

        const fetchedMovies = data.Search.map((m: TFetchedMovie) => ({
          imdbID: m.imdbID,
          title: m.Title,
          year: parseInt(m.Year.split(" min")[0]),
          poster: m.Poster,
          type: m.Type,
          // runtime: parseInt(m.Runtime),
          // director: m.Director,
        }));

        setTotalResults(parseInt(data.totalResults));

        setMovies(fetchedMovies);
        cache.current[cacheKey] = {
          movies: fetchedMovies,
          totalResults: parseInt(data.totalResults),
        };

        setError("");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (searchText?.length < import.meta.env.VITE_MIN_SEARCH_LENGTH) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [searchText, page]);

  return { movies, totalResults, loading, error };
}
