import { Link, useSearchParams } from "react-router-dom";
import { posts } from "../data/posts";
import type { Post } from "../types/Post";

export default function BlogPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") || "all";

    const filteredPosts: Post[] = (category === "all") ? posts : posts.filter(post => post.category === category);;

    const handleFilterChange = (newCategory: string) => {
        if (newCategory === "all") {
            setSearchParams({});
            return;
        }

        setSearchParams({ category: newCategory });
    };

    return (
        <section>
            <h2>Blog</h2>

            <div className="filters">
                <button onClick={() => handleFilterChange("all")}>All</button>
                <button onClick={() => handleFilterChange("react")}>React</button>
                <button onClick={() => handleFilterChange("routing")}>Routing</button>
                <button onClick={() => handleFilterChange("typescript")}>Typescript</button>
            </div>

            {filteredPosts.length === 0 ? (
                <p>No posts found for category "{category}".</p>
            ) : (
                <div className="posts">
                    {filteredPosts.map(post => (
                        <article key={post.id} className="card">
                            <h3>{post.title}</h3>
                            <p>{post.extract}</p>
                            <p>
                                <strong>Category:</strong> {post.category}
                            </p>
                            <Link to={`/blog/${post.slug}`}>Lire l'article</Link>
                        </article>
                    ))}
                </div>
            )}

        </section>

);}