import type { Post } from "../types/Post";

export const posts: Post[] = [
    {
        id: 1,
        slug: "bien-débuter-avec-react",
        title: "Bien débuter avec React",
        extract: "Découvrez les bases de React et comment créer votre première application.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "react"
    },
    {  
        id: 2,
        slug: "comprendre-react-router",
        title: "Comprendre React Router",
        extract: "Apprenez à gérer la navigation dans votre application React avec React Router.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "routing"
    },
    {
        id: 3,
        slug: "typescript-dans-react",
        title: "TypeScript dans React",
        extract: "Découvrez comment utiliser TypeScript pour améliorer la qualité de votre code React.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "typescript"
    }
];