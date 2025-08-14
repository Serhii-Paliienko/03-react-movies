import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface SearchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
  if (!token) {
    throw new Error("Missing TMDB token");
  }

  const { data } = await axios.get<SearchMoviesResponse>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return Array.isArray(data?.results) ? data.results : [];
}
