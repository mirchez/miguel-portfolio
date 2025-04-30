"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Guard clause - if project is undefined, return an empty div
  if (!project) {
    console.error("Project is undefined in ProjectCard");
    return <div className="hidden"></div>;
  }

  const [isHovered, setIsHovered] = useState(false);

  // Add null checks and default values for all project properties
  const title = project.title || "Proyecto sin título";
  const description = project.description || "Sin descripción";
  const image = project.image || "/placeholder.svg?height=400&width=600";
  const link = project.link || "#";
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];
  const id = project.id || "unknown";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div className="p-6 relative z-20">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>

          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full text-white"
            aria-label={`Ver proyecto ${title}`}
          >
            <ExternalLink size={16} />
          </motion.a>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.slice(0, 4).map((tech) => {
            if (!tech) return null;

            const techId = tech.id || "unknown";
            const techName = tech.name || "Tecnología";
            const bgColor = tech.color?.bg || "#f3f4f6";
            const textColor = tech.color?.text || "#374151";

            return (
              <span
                key={`${id}-${techId} `}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                }}
              >
                {techName}
              </span>
            );
          })}

          {technologies.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
