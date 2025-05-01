"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { Search, ExternalLink, SquareArrowLeft, Code } from "lucide-react";
import { validateProjects } from "@/lib/utils";
import { Particles } from "@/components/ui/particle";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

// Validate projects to prevent errors
const validatedProjects = validateProjects(projects);

// Get the last 3 projects for featured section
const lastThreeProjects = validatedProjects.slice(0, 3);
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

const techCounts = new Map<string, number>();
allTechnologies.forEach((tech) => {
  techCounts.set(tech, (techCounts.get(tech) || 0) + 1);
});

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(validatedProjects);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("all");

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedSearchQuery(query);
    }, 600),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Filter projects based on category and debounced search query
  useEffect(() => {
    let result = validatedProjects;

    // If category is "all", exclude the first 3 projects
    if (selectedCategory === "all") {
      result = result.slice(3);
    }

    // Apply category filter if not "all"
    if (selectedCategory !== "all") {
      result = validatedProjects.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
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

      // Show toast with search results
      if (result.length === 0) {
        toast.error(`No projects found for "${debouncedSearchQuery}"`);
      } else {
        toast.success(
          `Found ${result.length} project${result.length === 1 ? "" : "s"}`,
          {
            duration: 800,
          }
        );
      }
    }

    setFilteredProjects(result);
  }, [selectedCategory, debouncedSearchQuery]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setActiveTab(category);

    // Show toast for category change
    if (category !== "all") {
      const categoryProjects = validatedProjects.filter(
        (project) => project.category === category
      );
      toast.success(
        `${categoryProjects.length} ${category} project${
          categoryProjects.length === 1 ? "" : "s"
        } found`,
        {
          duration: 800,
        }
      );
    } else {
      toast.success(`Showing all ${validatedProjects.length} projects`, {
        duration: 800,
      });
    }
  };

  // Rotate through the last 3 projects every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % lastThreeProjects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden pb-15 sm:pb-2 ">
      <Particles
        className="absolute inset-0 hidden lg:block"
        quantity={150}
        ease={10}
        color="#ffffff"
        refresh
      />
      <div className="relative z-10 mt-7 sm:mt-13 xl:mt-5">
        {/* Search Bar */}
        <header className="flex items-center justify-center p-6 sm:p-0 pb-0 xl:pb-2 ">
          <div className="relative max-w-[900px] w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects, technologies..."
              className="w-full bg-gray-800/30 border border-gray-700 rounded-lg py-3 sm:py-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 p-6">
          {/* Categories for Mobile */}
          <div className="flex flex-wrap gap-2 lg:hidden items-center justify-center ">
            <Link href="/">
              <div className="text-sm flex items-center gap-1 rounded-lg p-2  hover:bg-purple-500/20 cursor-pointer ">
                <SquareArrowLeft size={18} className="text-gray-400" />
                <span> Home</span>
              </div>
            </Link>
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "all"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange("fullstack")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "fullstack"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Fullstack
            </button>
            <button
              onClick={() => handleCategoryChange("ecommerce")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "ecommerce"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Ecommerce
            </button>
            <button
              onClick={() => handleCategoryChange("external-api")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "external-api"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              APIs
            </button>
          </div>
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6">
            <Link href="/">
              <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4 hover:bg-purple-500/20 cursor-pointer border border-gray-700">
                <SquareArrowLeft size={18} className="text-gray-400" />
                <span>Back To Home</span>
              </div>
            </Link>

            {/* Categories */}
            <div className="border border-gray-700 rounded-xl p-4  bg-gray-800/30">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`text-left p-2 rounded-lg text-sm ${
                      selectedCategory === category
                        ? "bg-purple-700/20 text-purple-400"
                        : "hover:bg-purple-500/20 "
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
            {/* Featured Projects */}
            {activeTab === "all" && (
              <Tilt key="compact" rotationFactor={2} isRevese>
                <motion.div
                  key={lastThreeProjects[currentFeaturedIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-3 md:p-6  bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
                    <a
                      href={lastThreeProjects[currentFeaturedIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative aspect-video md:aspect-auto">
                        <div />
                        <Image
                          src={
                            lastThreeProjects[currentFeaturedIndex]?.image ||
                            "/placeholder.svg?height=400&width=600"
                          }
                          alt={
                            lastThreeProjects[currentFeaturedIndex]?.title ||
                            "Featured Project"
                          }
                          width={600}
                          height={400}
                          priority={true}
                          className="object-cover h-[300px] sm:h-[350px] w-full object-top rounded-xl relative aspect-video md:aspect-auto"
                        />
                      </div>
                    </a>

                    <div className="pt-6 px-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-700 flex items-center justify-center hover:bg-purple-500/20 transition-all duration-200 cursor-pointer">
                            <Code size={25} />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-3xl font-medium">
                              {lastThreeProjects[currentFeaturedIndex]?.title}
                            </h3>
                            <p className="text-sm md:text-md text-gray-400">
                              Latest Project
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6 text-sm md:text-lg">
                          {lastThreeProjects[currentFeaturedIndex]?.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 text-sm md:text-lg">
                          {lastThreeProjects[currentFeaturedIndex]?.technologies
                            ?.slice(0, 3)
                            .map((tech) => (
                              <span
                                key={`${lastThreeProjects[currentFeaturedIndex].id}-${tech.id}`}
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
                          <div className="text-sm text-gray-400">Category</div>
                          <div className="text-sm md:text-lg font-medium capitalize">
                            {lastThreeProjects[currentFeaturedIndex]?.category}
                          </div>
                        </div>

                        <a
                          href={lastThreeProjects[currentFeaturedIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 sm:px-6 bg-gray-900 text-white rounded-lg hover:bg-purple-500/20 font-medium xl:w-60"
                        >
                          <button className="flex items-center gap-2 font-medium text-ellipsis w-full justify-center">
                            Visit
                            <ExternalLink size={16} />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            )}

            {/* Projects Grid */}
            <AnimatePresence>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-5 capitalize">
                  {activeTab === "all"
                    ? "All Projects"
                    : `${activeTab} Projects`}
                </h2>
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 md:mt-5 ">
                  <AnimatePresence>
                    {filteredProjects
                      .filter(
                        (project) =>
                          activeTab === "all" || project.category === activeTab
                      )
                      .map((project) => (
                        <Tilt key={project.id} rotationFactor={5} isRevese>
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="p-3 md:p-6 border bg-gray-800/30 border-gray-700 rounded-xl overflow-hidden h-[450px] md:h-[500px]"
                          >
                            <div className="flex flex-col gap-3 h-full">
                              <div className="relative h-[200px]">
                                <Image
                                  src={
                                    project.image ||
                                    "/placeholder.svg?height=300&width=400"
                                  }
                                  alt={project.title || "Project"}
                                  width={400}
                                  height={300}
                                  priority={
                                    project.id === "21" || project.id === "20"
                                  }
                                  className="w-full h-full object-cover transition-transform duration-300 rounded-xl"
                                />
                              </div>
                              <div className="pt-6 px-0 flex flex-col justify-between h-full">
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-lg mb-3">
                                      {project.title}
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-full capitalize">
                                      {project.category}
                                    </span>
                                  </div>

                                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                                    {project.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {project.technologies
                                      ?.slice(0, 3)
                                      .map((tech) => (
                                        <span
                                          key={`${project.id}-${tech.id}`}
                                          className="text-xs px-2 py-0.5 rounded-full"
                                          style={{
                                            backgroundColor:
                                              tech.color?.bg || "#2d2d3a",
                                            color:
                                              tech.color?.text || "#a8a8b3",
                                          }}
                                        >
                                          {tech.name}
                                        </span>
                                      ))}

                                    {project.technologies &&
                                      project.technologies.length > 6 && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                                          +{project.technologies.length - 6}
                                        </span>
                                      )}
                                  </div>
                                </div>

                                <div className="flex justify-end">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-fit"
                                  >
                                    <button className="flex items-center gap-2 sm:px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-purple-500/20 font-medium justify-center w-full sm:w-fit">
                                      Visit
                                      <ExternalLink size={16} />
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Tilt>
                      ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
