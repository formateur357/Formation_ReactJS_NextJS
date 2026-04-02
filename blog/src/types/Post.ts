export type Post = {
    id: number;
    slug: string;
    title: string;
    content: string;
    category: "react" | "routing" | "typescript";
}