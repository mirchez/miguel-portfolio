import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/types/projects";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validate project data to ensure all required fields are present
export function validateProjects(projects: any[]): Project[] {
  if (!Array.isArray(projects)) return [];

  return projects.map((project) => {
    if (!project) return createDefaultProject();

    // Ensure all required fields have default values if missing
    return {
      id: project.id || String(Math.random()),
      title: project.title || "Proyecto sin título",
      description: project.description || "Sin descripción",
      image: project.image || "/placeholder.svg?height=400&width=600",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.map((tech: any) => ({
            id: tech?.id || String(Math.random()),
            name: tech?.name || "Tecnología",
            color: {
              bg: tech?.color?.bg || "#2d2d3a",
              text: tech?.color?.text || "#a8a8b3",
            },
          }))
        : [],
      category: project.category || "otros",
      link: project.link || "#",
    };
  });
}

function createDefaultProject(): Project {
  return {
    id: String(Math.random()),
    title: "Proyecto sin título",
    description: "Sin descripción",
    image: "/placeholder.svg?height=400&width=600",
    technologies: [],
    category: "otros",
    link: "#",
  };
}
