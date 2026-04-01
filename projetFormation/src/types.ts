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

export interface TaskInterface {
  id: number;
  title: string;
  done: boolean;
}