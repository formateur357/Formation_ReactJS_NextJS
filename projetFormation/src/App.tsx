import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import type { NavLink, Skill } from "./types";
import "./App.css";

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
      </main>
    </>
  );
}

export default App;