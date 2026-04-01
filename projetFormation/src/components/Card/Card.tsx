import styles from "./Card.module.css";

// Interface des props du composant Card.
interface CardProps {
  title: string;
  description: string;
  level?: number;
  icon?: string;
}

function Card({
  title,
  description,
  level = 1,
  icon = "⚙️"
}: CardProps) {
  const stars = "★".repeat(level) + "☆".repeat(5 - level);

  return (
    <article className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.level}>{stars}</span>
    </article>
  );
}

export default Card;