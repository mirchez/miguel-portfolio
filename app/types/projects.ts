interface Technology {
  id: string;
  name: string;
  color: {
    bg: string;
    text: string;
  };
}

type ProjectCategory =
  | "fullstack"
  | "ecommerce"
  | "social"
  | "external-api"
  | "health"
  | "productivity"
  | "finance"
  | "all"
  | "game";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  category: ProjectCategory;
  link: string;
  videoLink?: string;
}

// Exportamos también la interfaz Technology por si se necesita en otro lugar
export type { Technology };
