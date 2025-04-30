"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Search, ExternalLink, SquareArrowLeft, Code } from "lucide-react";
import { validateProjects } from "@/lib/utils";
import { Particles } from "@/components/ui/particle";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";

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

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(validatedProjects);
  const [featuredProject, setFeaturedProject] = useState(validatedProjects[0]);

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Particles
        className="absolute inset-0"
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
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 sm:py-4  pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 p-6">
          {/* Categories for Mobile */}

          <div className="flex gap-2 lg:hidden items-center justify-center">
            <Link href="/">
              <div className="text-sm flex items-center gap-1 rounded-lg p-2 hover:bg-purple-500/20 cursor-pointer ">
                <SquareArrowLeft size={18} className="text-gray-400" />
                <span>Back To Home</span>
              </div>
            </Link>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "all"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("fullstack")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "fullstack"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Fullstack
            </button>
            <button
              onClick={() => setActiveTab("ecommerce")}
              className={`px-3 py-1 text-sm rounded-sm ${
                activeTab === "ecommerce"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Ecommerce
            </button>
            <button
              onClick={() => setActiveTab("external-api")}
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
              <div className="flex items-center gap-3 rounded-lg p-4 hover:bg-purple-500/20 cursor-pointer border border-gray-700">
                <SquareArrowLeft size={18} className="text-gray-400" />
                <span>Back To Home</span>
              </div>
            </Link>

            <div className="border border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
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
            {/* Featured Project */}
            <Tilt key="compact" rotationFactor={2} isRevese>
              <motion.div
                key={featuredProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-700 rounded-xl overflow-hidden "
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto h-[300px] sm:h-[350px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 " />
                    <Image
                      src={
                        featuredProject?.image ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={featuredProject?.title || "Featured Project"}
                      width={600}
                      height={400}
                      className="object-cover h-full w-full object-top"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4 ">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-700 flex items-center justify-center hover:bg-purple-500/20 transition-all duration-200 cursor-pointer">
                          <Code size={25} />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-3xl font-medium">
                            {featuredProject?.title}
                          </h3>
                          <p className="text-sm md:text-md text-gray-400">
                            Featured Project
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 text-sm md:text-lg">
                        {featuredProject?.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6 text-sm md:text-lg">
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
                        <div className="text-sm text-gray-400">Category</div>
                        <div className="text-sm md:text-lg font-medium capitalize">
                          {featuredProject?.category}
                        </div>
                      </div>

                      <a
                        href={featuredProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 sm:px-6 bg-gray-900 text-white rounded-lg hover:bg-purple-500/20 font-medium"
                      >
                        <button className="flex items-center gap-2 font-medium text-ellipsis w-full justify-center ">
                          Visit
                          <ExternalLink size={16} />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>

            {/* Projects Grid */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-wider ">
                {activeTab} Projects
              </h2>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 md:mt-5">
                {filteredProjects
                  .filter(
                    (project) =>
                      activeTab === "all" || project.category === activeTab
                  )
                  .slice(0, 3)
                  .map((project) => (
                    <Tilt key={project.id} rotationFactor={5} isRevese>
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-700 rounded-xl overflow-hidden h-[400px]"
                      >
                        <div className="relative  h-[200px]">
                          <Image
                            src={
                              project.image ||
                              "/placeholder.svg?height=300&width=400"
                            }
                            alt={project.title || "Project"}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 "
                          />
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
                        <div className="flex items-center justify-center mx-5">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <button className="flex items-center gap-2 sm:px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-purple-500/20  transition-all duration-200 font-medium  text-ellipsis w-full justify-center sm:w-fit ">
                              Visit
                              <ExternalLink size={16} />
                            </button>
                          </a>
                        </div>
                      </motion.div>
                    </Tilt>
                  ))}
              </div>

              {filteredProjects.length > 6 && (
                <div className="mt-6 text-center">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-purple-500/20 rounded-lg text-sm">
                    View more projects
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
