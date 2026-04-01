import styles from "./Header.module.css";
import type { NavLink } from "../../types";

// Interface des props du composant Header.
interface HeaderProps {
  title: string;
  subtitle?: string;
  links?: NavLink[];
}

function Header({ title, subtitle, links = [] }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <nav>
        <ul className={styles.navList}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;