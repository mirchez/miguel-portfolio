"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
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
  Menu,
  X,
  Grid3X3,
  Tag,
  Layers,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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

const uniqueTechnologies = Array.from(techCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([name]) => name);

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTech: string[];
  onTechChange: (tech: string[]) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredCount: number;
  totalCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  selectedCategory,
  onCategoryChange,
  selectedTech,
  onTechChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}) => {
  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      onTechChange(selectedTech.filter((t) => t !== tech));
    } else {
      onTechChange([...selectedTech, tech]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange("all");
    onTechChange([]);
  };

  const hasActiveFilters =
    selectedCategory !== "all" || selectedTech.length > 0;

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
          width: isOpen ? "320px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="fixed left-0 top-0 h-full bg-background/95 backdrop-blur-xl border-r border-border/50 z-50 lg:sticky lg:top-0 lg:h-screen overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Filters</h2>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 py-4">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-muted-foreground">
                  Search Projects
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 h-9"
                    value={searchQuery}
                    onChange={onSearchChange}
                  />
                </div>
              </motion.div>

              <Separator />

              {/* Results Counter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Results</span>
                </div>
                <Badge variant="secondary" className="font-mono text-xs">
                  {filteredCount}/{totalCount}
                </Badge>
              </motion.div>

              <Separator />

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
                transition={{ delay: 0.25 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Categories</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => onCategoryChange(category)}
                      className="justify-start capitalize h-8 text-xs"
                    >
                      {category}
                      {category !== "all" && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-4 text-[10px]"
                        >
                          {
                            validatedProjects.filter(
                              (p) => p.category === category
                            ).length
                          }
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </motion.div>

              <Separator />

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Technologies</span>
                  {selectedTech.length > 0 && (
                    <Badge variant="secondary" className="h-4 text-[10px]">
                      {selectedTech.length}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  {uniqueTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      variant={
                        selectedTech.includes(tech) ? "default" : "ghost"
                      }
                      size="sm"
                      onClick={() => toggleTech(tech)}
                      className="w-full justify-start h-8 text-xs font-normal"
                    >
                      {tech}
                      <Badge
                        variant="secondary"
                        className="ml-auto h-4 text-[10px]"
                      >
                        {techCounts.get(tech)}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </motion.div>
            </div>
          </ScrollArea>

          {/* Footer */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-4 border-t border-border/50"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="w-full h-8 text-xs"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(validatedProjects);
  const [api, setApi] = useState<CarouselApi>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debounced search handler
  const debouncedSearchHandler = useCallback(
    debounce((query) => setDebouncedSearchQuery(query), 600),
    []
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      debouncedSearchHandler(e.target.value);
    },
    [debouncedSearchHandler]
  );

  // Filter projects based on all filters
  useEffect(() => {
    let result = validatedProjects;

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Apply technology filter
    if (selectedTech.length > 0) {
      result = result.filter((project) =>
        selectedTech.some((tech) =>
          project.technologies?.some((t) => t.name === tech)
        )
      );
    }

    // Apply search filter
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
  }, [selectedCategory, selectedTech, debouncedSearchQuery]);

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
    }
  };

  const getFeaturedProjects = () => {
    if (
      selectedCategory === "all" &&
      selectedTech.length === 0 &&
      !debouncedSearchQuery
    ) {
      return lastThreeProjects;
    }
    return [];
  };

  const featuredProjects = getFeaturedProjects();
  const shouldShowFeatured = featuredProjects.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filteredCount={filteredProjects.length}
          totalCount={validatedProjects.length}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
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
                  {/* Top Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="hidden sm:flex"
                      >
                        <Link href="/">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Home
                        </Link>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="hidden lg:flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {sidebarOpen ? "Hide" : "Show"} Filters
                    </Button>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                      My Projects
                    </h1>
                    <p className="text-muted-foreground">
                      A collection of {validatedProjects.length} projects
                      showcasing my development journey
                    </p>
                  </div>
                </motion.div>

                {/* Featured Projects */}
                {shouldShowFeatured && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                          Featured Projects
                          <Badge variant="secondary" className="font-normal">
                            {featuredProjects.length} projects
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
                            {featuredProjects.map((project) => (
                              <CarouselItem key={project.id}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 mx-6 pb-3">
                                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted border">
                                    {project.videoLink ? (
                                      <VideoPlayer
                                        src={project.videoLink}
                                        poster={
                                          project.image || "/placeholder.svg"
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Link
                                        href={project.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-full"
                                      >
                                        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                                          <Image
                                            src={
                                              project.image ||
                                              "/placeholder.svg"
                                            }
                                            alt={
                                              project.title ||
                                              "Featured Project"
                                            }
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                      </Link>
                                    )}
                                  </div>

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
                  transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                >
                  <div className="space-y-6">
                    {/* Project Count */}
                    <div className="flex items-center justify-between px-2">
                      <h2 className="font-semibold">
                        {shouldShowFeatured ? "All Projects" : "Projects"}
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
                                {project.videoLink ? (
                                  <VideoPlayer
                                    src={project.videoLink}
                                    poster={project.image || "/placeholder.svg"}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Link
                                    href={project.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full"
                                  >
                                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                                      <Image
                                        src={
                                          project.image || "/placeholder.svg"
                                        }
                                        alt={project.title || "Project"}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  </Link>
                                )}
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
      </div>
    </div>
  );
}
