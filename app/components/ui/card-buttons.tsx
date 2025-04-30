"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Link as LinkLucide } from "lucide-react";
import FadeContent from "@/components/ui/fadeContent";
import { Typewriter } from "react-simple-typewriter";

export const CardButtons = () => {
  return (
    <div className="mt-1 md:mt-2 bg-transparent flex items-center justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 text-center">
        {/* Botón para Ver Portafolio (con efecto Typewriter) */}
        <FadeContent
          blur={true}
          duration={350}
          delay={450}
          easing="ease-out"
          initialOpacity={0}
        >
          <Link href="/proyects" passHref>
            <button className="group px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2 w-full text-ellipsis">
              <Typewriter
                words={["Explore Proyects", "20+ Deployed"]}
                loop
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={3000}
              />
              <ExternalLink className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 transition-all duration-200" />
            </button>
          </Link>
        </FadeContent>

        {/* Botón de Contacto */}
        <FadeContent
          blur={true}
          duration={350}
          delay={550}
          easing="ease-out"
          initialOpacity={0}
        >
          <Link href="/contact" passHref>
            <button className="group px-6 py-3 border-2 border-gray-900 text-white rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 font-medium flex items-center gap-2">
              Get In Touch
              <LinkLucide className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 transition-all duration-200 text-ellipsis" />
            </button>
          </Link>
        </FadeContent>
      </div>
    </div>
  );
};
