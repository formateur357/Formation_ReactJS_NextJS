import { useParams } from "react-router-dom";
import { posts } from "../data/posts";
import type { Post } from "../types/Post";

export default function PostPage() {

    const { slug } = useParams<{ slug: string }>();

    const post: Post | undefined = posts.find(item => item.slug === slug);

    if (!post) {
        return (
            <section>
                <h2>Article introuvable</h2>
                <p>L'article demandé n'a pas pu être trouvé.</p>
            </section>
        );
    }

    return (
        <section>
            <h2>{post.title}</h2>
            <p><strong>Catégorie:</strong> {post.category}</p>
            <p>{post.content}</p>
        </section>
    );
}