import { useEffect } from 'react';

function PageTitle({ title }: { title: string }) {
    // useEffect s'exécute après chaque render
    useEffect(() => {
        // Code à exécuter : effets de bord
        document.title = `${title} | Mon App`;
        // Optionnel : fonction de cleanup
        return () => {
            document.title = "Mon App";
        };
    }, [title]); // Tableau de dépendances
    return <h1>{title}</h1>;
}

export default PageTitle;