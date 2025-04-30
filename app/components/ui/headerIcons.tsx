"use client";

import { Github, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeaderIcons() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname === "/proyects") {
    return null; // No renderizar iconos en la página de contacto
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      }}
      exit={{
        opacity: 0,
        y: -100,
        transition: { duration: 0.3 },
      }}
      className="absolute top-3 right-1/2 translate-x-1/2 md:right-20 md:top-7 z-50 flex space-x-1 md:space-x-4"
    >
      <Link
        href="https://github.com/mirchez"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github className="h-7 w-7 lg:w-10 lg:h-10 text-white hover:text-gray-400 transition" />
      </Link>
      <Link
        href="https://linkedin.com/in/mirchez"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-7 w-7 lg:w-10 lg:h-10 text-white hover:text-gray-400 transition" />
      </Link>
    </motion.div>
  );
}
