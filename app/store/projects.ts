import { create } from "zustand";
import { projects } from "../data/projects";
import type { Project } from "../types/projects";

interface ProjectsState {
  selectedCategory: string;
  searchQuery: string;
  filteredProjects: Project[];
  featuredProject: Project;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  filterProjects: () => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  selectedCategory: "all",
  searchQuery: "",
  filteredProjects: projects,
  featuredProject: projects[0],

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().filterProjects();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterProjects();
  },

  filterProjects: () => {
    const { selectedCategory, searchQuery } = get();
    let result = projects;

    if (selectedCategory !== "all") {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.technologies?.some((tech) =>
            tech.name?.toLowerCase().includes(query)
          )
      );
    }

    set({ filteredProjects: result });
  },
}));
