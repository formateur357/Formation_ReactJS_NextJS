export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  id: number;
  title: string;
  level: number;
  icon: string;
  description: string;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export type filter = "all" | "active" | "done";