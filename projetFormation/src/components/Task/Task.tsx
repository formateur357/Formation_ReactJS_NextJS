import React from "react";
import type { Todo } from "../../types";
// import styles from "./Task.module.css";

interface TaskProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
}

function Task({ todo, onToggle, onDelete, onEdit }: TaskProps) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [draftTitle, setDraftTitle] = React.useState(todo.title);

    const saveEdit = () => {
        const cleanTitle = draftTitle.trim();

        if (!cleanTitle) {
            setDraftTitle(todo.title);
            setIsEditing(false);
            return;
        }

        onEdit(todo.id, cleanTitle);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            setDraftTitle(todo.title);
            setIsEditing(false);
        }
    };


    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span>{todo.title} {todo.done ? "✅" : "❌"}</span>
            )}
            
            <button
                onClick={() => {
                    setIsEditing(true);
                    setDraftTitle(todo.title);
                }}
            >
                Modifier
            </button>
            <button onClick={() => onDelete(todo.id)}>Supprimer</button>
        </li>
    )
}

export default Task;
