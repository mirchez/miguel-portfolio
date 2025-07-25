import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TechnologySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "El nombre de la tecnología es requerido"),
  color: z
    .object({
      bg: z.string().default("#2d2d3a"),
      text: z.string().default("#a8a8b3"),
    })
    .default({
      bg: "#2d2d3a",
      text: "#a8a8b3",
    }),
});

const ProjectSchema = z.object({
  id: z.string().default(() => String(Math.random())),
  title: z
    .string()
    .min(1, "El título es requerido")
    .default("Proyecto sin título"),
  description: z.string().default("Sin descripción"),
  image: z.string().default("/placeholder.svg?height=400&width=600"),
  technologies: z.array(TechnologySchema).default([]),
  category: z.string().default("otros"),
  link: z.string().default("#"),
  videoLink: z.string().optional(),
});

const createDefaultProject = () => ProjectSchema.parse({});

export function validateProjects(
  projects: unknown
): z.infer<typeof ProjectSchema>[] {
  if (!Array.isArray(projects)) return [];

  return projects.map((project) => {
    try {
      return ProjectSchema.parse(project);
    } catch (error) {
      console.error("Error al validar proyecto:", error);
      return createDefaultProject();
    }
  });
}
