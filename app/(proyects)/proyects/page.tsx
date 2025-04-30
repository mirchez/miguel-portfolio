"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import {
  Search,
  ExternalLink,
  SquareArrowLeft,
  Briefcase,
  Code,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { validateProjects } from "@/lib/utils";
import { Particles } from "@/components/ui/particle";
import Link from "next/link";

// Validate projects to prevent errors
const validatedProjects = validateProjects(projects);

// Get unique categories
const categories = [
  "all",
  ...new Set(validatedProjects.map((project) => project.category || "other")),
];

// Get unique technologies
const allTechnologies = validatedProjects.flatMap(
  (project) =>
    project.technologies
      ?.map((tech) => tech.name)
      .filter((name): name is string => name !== undefined) || []
);
const uniqueTechnologies = [...new Set(allTechnologies)];
const techCounts = new Map<string, number>();
allTechnologies.forEach((tech) => {
  techCounts.set(tech, (techCounts.get(tech) || 0) + 1);
});

// Sort technologies by count
const topTechnologies = Array.from(techCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, count]) => ({ name, count }));

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(validatedProjects);
  const [featuredProject, setFeaturedProject] = useState(validatedProjects[0]);
  const [countdown, setCountdown] = useState({
    hours: 15,
    minutes: 32,
    seconds: 17,
  });
  const [activeTab, setActiveTab] = useState("all");

  // Filter projects based on category and search query
  useEffect(() => {
    let result = validatedProjects;

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
          false ||
          project.description?.toLowerCase().includes(query) ||
          false ||
          project.technologies?.some(
            (tech) => tech.name?.toLowerCase().includes(query) || false
          ) ||
          false
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, searchQuery]);

  // Set a random featured project every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * validatedProjects.length);
      setFeaturedProject(validatedProjects[randomIndex]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 15, minutes: 32, seconds: 17 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#121219] text-white overflow-x-hidden">
      <div className="relative z-10">
        {/* Search Bar */}
        <header className="flex items-center justify-center p-6 pb-0">
          <div className="relative max-w-[900px] w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar proyectos, tecnologías..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 p-6">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer">
                <Briefcase size={18} className="text-gray-400" />
                <span>Todos los proyectos</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer">
                <SquareArrowLeft size={18} className="text-gray-400" />
                <Link href="/">
                  <span>Back To Home</span>
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Categorías
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left p-2 rounded-lg text-sm ${
                      selectedCategory === category
                        ? "bg-purple-500/20 text-purple-400"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <span className="capitalize">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6">
            {/* Featured Project */}
            <div className="bg-gray-800/50 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <Image
                    src={
                      featuredProject?.image ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={featuredProject?.title || "Featured Project"}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-sm font-medium">
                      {countdown.hours}h : {countdown.minutes}m :{" "}
                      {countdown.seconds}s
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Code size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {featuredProject?.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Proyecto Destacado
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">
                      {featuredProject?.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject?.technologies
                        ?.slice(0, 5)
                        .map((tech) => (
                          <span
                            key={`${featuredProject.id}-${tech.id}`}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: tech.color?.bg || "#2d2d3a",
                              color: tech.color?.text || "#a8a8b3",
                            }}
                          >
                            {tech.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-400">Categoría</div>
                      <div className="text-sm font-medium capitalize">
                        {featuredProject?.category}
                      </div>
                    </div>

                    <a
                      href={featuredProject?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <span>Ver Proyecto</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Proyectos</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      activeTab === "all"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActiveTab("fullstack")}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      activeTab === "fullstack"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400"
                    }`}
                  >
                    Fullstack
                  </button>
                  <button
                    onClick={() => setActiveTab("ecommerce")}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      activeTab === "ecommerce"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400"
                    }`}
                  >
                    Ecommerce
                  </button>
                  <button
                    onClick={() => setActiveTab("external-api")}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      activeTab === "external-api"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400"
                    }`}
                  >
                    APIs
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="wait">
                  {filteredProjects
                    .filter(
                      (project) =>
                        activeTab === "all" || project.category === activeTab
                    )
                    .slice(0, 6)
                    .map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800/50 rounded-xl overflow-hidden group"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={
                              project.image ||
                              "/placeholder.svg?height=300&width=400"
                            }
                            alt={project.title || "Project"}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium flex items-center gap-1 hover:underline"
                            >
                              <span>Ver proyecto</span>
                              <ChevronRight size={14} />
                            </a>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <span className="text-xs px-2 py-1 bg-gray-700 rounded-full capitalize">
                              {project.category}
                            </span>
                          </div>

                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {project.technologies?.slice(0, 3).map((tech) => (
                              <span
                                key={`${project.id}-${tech.id}`}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: tech.color?.bg || "#2d2d3a",
                                  color: tech.color?.text || "#a8a8b3",
                                }}
                              >
                                {tech.name}
                              </span>
                            ))}

                            {(project.technologies?.length || 0) > 3 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                                +{(project.technologies?.length || 0) - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {filteredProjects.length > 6 && (
                <div className="mt-6 text-center">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
                    Ver más proyectos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
