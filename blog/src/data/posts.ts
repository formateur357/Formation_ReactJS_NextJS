import type { Post } from "../types/Post";

export const posts: Post[] = [
    {
        id: 1,
        slug: "bien-débuter-avec-react",
        title: "Bien débuter avec React",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "react"
    },
    {  
        id: 2,
        slug: "comprendre-react-router",
        title: "Comprendre React Router",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "routing"
    },
    {
        id: 3,
        slug: "typescript-dans-react",
        title: "TypeScript dans React",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "typescript"
    }
];