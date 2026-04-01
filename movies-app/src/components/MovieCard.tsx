import { getPosterUrl } from "../api/movies";

function MovieCard({ movie, isFavorite, onToggleFavorite }: { movie: any; isFavorite: boolean; onToggleFavorite: () => void}) {
    const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

    return (
        <article className={`movie-card ${isFavorite ? "movie-card--favorite" : ""}`}>
            <img src={getPosterUrl(movie.poster_path)} alt={movie.title} className="movie-card_image"/>

            <div className="movie-card_content">
                <h2>{movie.title}</h2>
                <p>Année : {releaseYear}</p>
                <p>Note : {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
                <button onClick={onToggleFavorite} className={`movie-card_button ${isFavorite ? "movie-card_button--favorite" : ""}`}>
                    {isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
                </button>
            </div>
        </article>
    )
}

export default MovieCard;