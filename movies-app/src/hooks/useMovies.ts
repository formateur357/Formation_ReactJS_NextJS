import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "../api/movies";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length >= 2,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}