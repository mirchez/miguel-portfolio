"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "./ui/particle";
import { Tilt } from "./ui/tilt";
import { Atom, Leaf, SquareStack, Hexagon } from "lucide-react";
import { useLucideDrawerAnimation } from "./ui/lucide-icon-drawer";
import { CardButtons } from "@/components/ui/card-buttons";
import { CardTitle } from "@/components/ui/card-title";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const root = useLucideDrawerAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Altura fija para mantener consistencia durante la transición
  const cardHeight = "min-h-[400px]";
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center text-white font-sans overflow-y-auto px-4 pb-6 sm:pb-0">
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={10}
        color="#ffffff"
        refresh
      />

      <AnimatePresence mode="wait">
        <div className="w-full max-w-7xl mx-auto z-10 px-6 py-12 md:pb-24 md:pt-20">
          {/* Titulo Principal */}
          <CardTitle />
          <div className="flex flex-col xl:flex-row gap-8 md:gap-16 items-center">
            {/* Sección izquierda */}
            <motion.div
              key="left-section"
              className="w-full xl:w-1/4 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl font-light tracking-wider mb-6">
                ABOUT ME
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                20-year-old Frontend Developer with strong backend skills,
                currently pursuing a degree in Systems Engineering. Passionate
                about innovation, self-taught, and committed to mastering modern
                technologies. Known for a strong sense of responsibility,
                dedication, and a drive to overcome any challenge.
              </p>
            </motion.div>

            {/*Principal Card */}
            <Tilt key="main-card" rotationFactor={2} isRevese>
              <motion.div
                key="profile-card"
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
                className={`z-10 py-10 pb-5 sm:px-10 sm:py-10 rounded-3xl text-center w-full lg:w-[600px] border border-white/20 cursor-pointer ${cardHeight} flex flex-col justify-center`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/Perfil.jpg"
                  width={5184}
                  height={3880}
                  alt="Profile Picture"
                  className="w-60 h-45 m-auto rounded-xl opacity-95"
                />
                <h1 className="text-2xl font-bold mt-2">MIGUEL MIRANDA</h1>
                <h2 className="text-md text-gray-300">Web Developer</h2>
                <p className="text-sm text-gray-400 mt-5">
                  Turning ideas into fast, scalable, and reliable web
                  applications with React and Next.js, driven by a strong
                  commitment to quality.
                </p>
                <div
                  ref={root}
                  className="flex flex-col gap-4 mt-8 justify-center items-center"
                >
                  <div className="flex flex-row gap-4 aling-center justify-center">
                    <Leaf size={48} className="text-green-700" />
                    <SquareStack size={48} className="text-red-400" />
                    <Atom size={48} className="text-cyan-400" />
                    <Hexagon size={48} className="text-green-400" />
                  </div>
                </div>
                <div>
                  {/* Card Buttons*/}
                  <CardButtons />
                </div>
              </motion.div>
            </Tilt>

            {/* Sección derecha */}
            <motion.div
              key="right-section"
              className="w-full xl:w-1/4 text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl font-light tracking-wider mb-6">
                My Experience
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                With over a year of experience delivering projects using React,
                TypeScript, Node.js, MongoDB, and Next.js, I am dedicated to
                building scalable, high-performance web platforms that provide
                exceptional user experiences. Constantly improving my skills to
                stay ahead in a fast-evolving tech landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
}
