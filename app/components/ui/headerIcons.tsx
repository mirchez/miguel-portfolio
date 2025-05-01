"use client";

import { Github, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderIcons() {
  const pathname = usePathname();
  const iconsClass: string =
    "h-7 w-7 xl:w-10 xl:h-10 text-white hover:text-purple-500 ";

  return (
    pathname !== "/contact" && (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 },
          }}
          className="absolute top-3 right-1/2 translate-x-1/2 xl:right-20 xl:top-7 z-50 flex space-x-1 md:space-x-4"
        >
          <Link
            href="https://github.com/mirchez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className={iconsClass} />
          </Link>
          <Link
            href="https://linkedin.com/in/mirchez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className={iconsClass} />
          </Link>
        </motion.div>
      </AnimatePresence>
    )
  );
}
