import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { toast, Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const onSubmit = async (value: string): Promise<void> => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(value);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
