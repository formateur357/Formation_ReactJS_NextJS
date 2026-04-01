import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import type { filter, NavLink, Skill, Todo } from "./types";
import "./App.css";
import React, { useEffect } from "react";
import Task from "./components/Task/Task";
import PageTitle from "./components/Title";

// Tableau de données typé : chaque objet doit respecter l'interface Skill.
const skills: Skill[] = [
  {
    id: 1,
    title: "HTML/CSS",
    level: 5,
    icon: "🌐",
    description: "Intégration sémantique et responsive."
  },
  {
    id: 2,
    title: "JavaScript",
    level: 4,
    icon: "⚡",
    description: "ES6+, DOM, manipulation et logique applicative."
  },
  {
    id: 3,
    title: "React",
    level: 3,
    icon: "⚛️",
    description: "Premiers composants, props et composition."
  },
  {
    id: 4,
    title: "Git",
    level: 4,
    icon: "🔧",
    description: "Versionning, branches et travail collaboratif."
  }
];

// Tableau de navigation typé.
const links: NavLink[] = [
  { label: "Accueil", href: "#" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([
    { id: 1, title: "Apprendre React", done: false },
    { id: 2, title: "Créer un portfolio", done: true },
    { id: 3, title: "Maitriser les hooks", done: false }
  ]);

  const [filter, setFilter] = React.useState<filter>("all");
  const [newTitle, setNewTitle] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // const savedTodos = localStorage.getItem("todos");

    // if (savedTodos) {
    //   setTodos(JSON.parse(savedTodos));
    // }
      inputRef.current?.focus();  
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = newTitle.trim();

    if (!cleanTitle) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title: cleanTitle, done: false }
    ]);

    setNewTitle("");
    inputRef.current?.focus();
  };

  const editTodo = (id: number, newTitle: string) => {
    const cleanTitle = newTitle.trim();

    if (!cleanTitle) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: cleanTitle } : todo
      )
    );
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  const remaining = todos.filter((todo) => !todo.done).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  return (
    <>
      <Header
        title="Mon Portfolio"
        subtitle="Développeur Front-End"
        links={links}
      />

      <main className="container">
        <section className="hero">
          <h2>Bienvenue</h2>
          <p>
            Ceci est une première application React construite avec des
            composants réutilisables, des props et du typage TypeScript.
          </p>
        </section>

        <section id="skills">
          <h2 className="section-title">Mes compétences</h2>

          <div className="skills-grid">
            {skills.map((skill) => (
              <Card key={skill.id} {...skill} />
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title">Contact</h2>
          <p>email@example.com</p>
        </section>

        <section className="todos">
          <h2 className="section-title">Mes Tâches</h2>

          <form onSubmit={addTodo}>
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nouvelle tâche..."
            />
            <button type="submit">Ajouter</button>
          </form>
          <PageTitle title="Mon Portfolio" />


          <div>
            <button onClick={() => setFilter("all")}>Toutes</button>
            <button onClick={() => setFilter("active")}>Actives</button>
            <button onClick={() => setFilter("done")}>Terminées</button>
          </div>

          <p>{remaining} tâche{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}</p>

          <ul>
            {filteredTodos.map((todo) => (
              <Task key={todo.id} todo={todo} onToggle={toggleDone} onDelete={deleteTodo} onEdit={editTodo} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;