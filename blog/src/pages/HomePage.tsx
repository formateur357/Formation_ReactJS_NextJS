import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function HomePage() {
    const latestPosts = posts.slice(0, 2); // Affiche les 2 derniers articles

    return (
        <section>
            <h2>Accueil</h2>
            <p>Bienvenue sur mon blog React !</p>

            <h3>Derniers articles</h3>

            {latestPosts.map(post => (
                <article key={post.id} className="card">
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <Link to={`/blog/${post.slug}`}>Lire l'article</Link>
                </article>
            ))}


        </section>
    );
}