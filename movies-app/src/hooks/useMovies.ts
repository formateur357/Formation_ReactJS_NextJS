import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "../api/movies";

export function usePopularMovies(page: number = 1) {
    return useQuery({
        queryKey: ["movies", "popular", page],
        queryFn: () => getPopularMovies(page),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useSearchMovies(query: string, page: number = 1) {
    return useQuery({
        queryKey: ["movies", "search", query, page],
        queryFn: () => searchMovies(query, page),
        enabled: query.trim().length >= 2, // Ne pas lancer la recherche si la requête est trop courte
        placeholderData: keepPreviousData,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}