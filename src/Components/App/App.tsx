import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState<any[]>([]);
  console.log(movies.length);
  const API_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Nzk2OTJjZmJhMjQwMzMyYmQwN2M3MTkyYmI5ZDIzZCIsIm5iZiI6MTc1NTAyMTM0Mi41ODgsInN1YiI6IjY4OWI4MDFlZGM2MDYwMGU2YThkYjEzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0DZSsiSy283xEZzG5BEg7_E6fDuRrDnVpPzU9M75wE";
  const onSubmit = async (value: string): Promise<void> => {
    setMovies([]);
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: {
          query: value,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });
      const results = Array.isArray(res.data?.results) ? res.data.results : [];
      if (results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      } else {
        setMovies(results);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later.");
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
    </div>
  );
};

export default App;
