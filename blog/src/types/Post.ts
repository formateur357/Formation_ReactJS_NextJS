export type Post = {
    id: number;
    slug: string;
    title: string;
    extract: string;
    content: string;
    category: "react" | "routing" | "typescript";
}