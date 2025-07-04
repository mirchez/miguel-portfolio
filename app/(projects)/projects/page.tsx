"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import {
  Search,
  ExternalLink,
  ArrowLeft,
  Code,
  Filter,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { validateProjects } from "@/lib/utils";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";
import { VideoPlayer } from "../../components/ui/video-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const [api, setApi] = useState<CarouselApi>();

  // Debounced search handler
  const debouncedSearch = useCallback((query: string) => {
    setDebouncedSearchQuery(query);
  }, []);

  const debouncedSearchHandler = useCallback(debounce(debouncedSearch, 600), [
    debouncedSearch,
  ]);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      debouncedSearchHandler(e.target.value);
    },
    [debouncedSearchHandler]
  );

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
          project.description?.toLowerCase().includes(query) ||
          project.technologies?.some((tech) =>
            tech.name?.toLowerCase().includes(query)
          )
      );

      // Show toast with search results
      if (result.length === 0) {
        toast.error(`No projects found for "${debouncedSearchQuery}"`);
      } else {
        toast.success(
          `Found ${result.length} project${result.length === 1 ? "" : "s"}`,
          { duration: 800 }
        );
      }
    }

    setFilteredProjects(result);
  }, [selectedCategory, debouncedSearchQuery]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    if (!category) return;
    setSelectedCategory(category);

    // Show toast for category change
    if (category !== "all") {
      const categoryProjects = validatedProjects.filter(
        (project) => project.category === category
      );
      toast.success(
        `${categoryProjects.length} ${category} project${
          categoryProjects.length === 1 ? "" : "s"
        } found`,
        { duration: 800 }
      );
    } else {
      toast.success(`Showing all ${validatedProjects.length} projects`, {
        duration: 800,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Back to Home */}
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              {/* Title and Search */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    My Projects
                  </h1>
                  <p className="text-muted-foreground">
                    A collection of {validatedProjects.length} projects
                    showcasing my development journey
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search projects, technologies..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 px-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold">Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2 px-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Featured Project */}
            {selectedCategory === "all" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                      Featured Projects
                      <Badge variant="secondary" className="font-normal">
                        {lastThreeProjects.length} projects
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full relative"
                      setApi={setApi}
                    >
                      <CarouselContent>
                        {lastThreeProjects.map((project) => (
                          <CarouselItem key={project.id}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 mx-6 pb-3">
                              {/* Project Image/Video */}
                              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted border">
                                <Link
                                  href={project.link || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full h-full"
                                >
                                  {project.videoLink ? (
                                    <VideoPlayer
                                      src={project.videoLink}
                                      poster={
                                        project.image || "/placeholder.svg"
                                      }
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                                      <Image
                                        src={
                                          project.image || "/placeholder.svg"
                                        }
                                        alt={
                                          project.title || "Featured Project"
                                        }
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                </Link>
                              </div>

                              {/* Project Info */}
                              <div className="pl-6 space-y-3">
                                <div className="space-y-1.5">
                                  <div className="flex flex-col gap-2 mb-3">
                                    <Link
                                      href={project.link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group/link"
                                    >
                                      <h3 className="text-xl font-semibold group-hover/link:text-primary transition-colors">
                                        {project.title}
                                      </h3>
                                    </Link>
                                    <Badge
                                      variant="outline"
                                      className="capitalize text-xs"
                                    >
                                      {project.category}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {project.description}
                                  </p>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-1">
                                    {project.technologies?.map((tech) => (
                                      <Badge
                                        key={tech.id}
                                        variant="secondary"
                                        className="text-[10px] font-normal py-0"
                                      >
                                        {tech.name}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex gap-1.5">
                                    {project.videoLink && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs px-2"
                                        asChild
                                      >
                                        <Link
                                          href={project.videoLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center"
                                        >
                                          <Play className="mr-1.5 h-3 w-3" />
                                          Watch Demo
                                        </Link>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <div className="h-full">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs px-2"
                                    asChild
                                  >
                                    <Link
                                      href={project.link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center"
                                    >
                                      <ExternalLink className="mr-1.5 h-3 w-3" />
                                      View Project
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="absolute bottom-3 right-6 flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => api?.scrollPrev()}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => api?.scrollNext()}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Carousel>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Projects Grid */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                {/* Project Count */}
                <div className="flex items-center justify-between px-2">
                  <h2 className="font-semibold">
                    {selectedCategory === "all"
                      ? "All Projects"
                      : `${selectedCategory} Projects`}
                  </h2>
                  <Badge variant="secondary" className="font-normal">
                    {filteredProjects.length} project
                    {filteredProjects.length === 1 ? "" : "s"}
                  </Badge>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        key={project.id}
                      >
                        <Card className="overflow-hidden group mx-2 h-full">
                          {/* Project Image/Video Container */}
                          <div className="relative aspect-[16/9] mx-4 overflow-hidden rounded-[0.9rem] bg-muted mt-[-5px] border">
                            <Link
                              href={project.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full"
                            >
                              {project.videoLink ? (
                                <div className="relative w-full h-full">
                                  <VideoPlayer
                                    src={project.videoLink}
                                    poster={project.image || "/placeholder.svg"}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <Play className="h-12 w-12 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                                  <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title || "Project"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </Link>
                          </div>

                          {/* Project Info */}
                          <div className="p-4 space-y-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className="capitalize text-xs"
                                >
                                  {project.category}
                                </Badge>
                                <Code className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Link
                                href={project.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group/link"
                              >
                                <h3 className="font-semibold line-clamp-1 group-hover/link:text-primary transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {project.description}
                                </p>
                              </Link>
                            </div>

                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-1">
                                {project.technologies?.map((tech) => (
                                  <Badge
                                    key={tech.id}
                                    variant="secondary"
                                    className="text-[10px] font-normal py-0"
                                  >
                                    {tech.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
