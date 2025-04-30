"use client";

import { motion } from "framer-motion";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function Filter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {selectedCategory === category && (
            <motion.span
              layoutId="activeCategory"
              className="absolute inset-0 bg-purple-600 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <span
            className={`relative z-10 capitalize ${
              selectedCategory === category ? "text-white" : "text-gray-400"
            }`}
          >
            {category}
          </span>
        </button>
      ))}
    </div>
  );
}
