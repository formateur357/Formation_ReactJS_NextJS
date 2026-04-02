import { getPosterUrl } from "../api/movies";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
}

function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <article className={`movie-card ${isFavorite ? "movie-card--favorite" : ""}`}>
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        className="movie-card__image"
      />

      <div className="movie-card__content">
        <h2>{movie.title}</h2>
        <p>Année : {releaseYear}</p>
        <p>Note : {movie.vote_average?.toFixed(1) ?? "N/A"}</p>

        <button
          className={`movie-card__button ${
            isFavorite ? "movie-card__button--favorite" : ""
          }`}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;