"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";
import { useState } from "react";
import { Tilt } from "./ui/tilt";

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
  );
}

function getGmailLink() {
  if (typeof navigator === "undefined") return "https://mail.google.com/mail";

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    if (isIOS()) {
      // iOS
      return "googlegmail://co?to=mmirandasanchez16@gmail.com";
    } else {
      // Android
      return "intent://co?to=mmirandasanchez16@gmail.com#Intent;package=com.google.android.gm;scheme=googlegmail;end";
    }
  }
  // Desktop
  return "https://mail.google.com/mail/?view=cm&to=mmirandasanchez16@gmail.com";
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  const handleGmailClick = () => {
    const link = getGmailLink();
    window.location.href = link;
  };

  const iconsClass: string =
    "w-full bg-neutral-800 text-white flex items-center justify-center gap-2 py-3 rounded-md hover:bg-purple-600/20 transition-colors";

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <AnimatePresence mode="wait">
        <Tilt key="contact-card" rotationFactor={1} isRevese>
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 15 },
            }}
            exit={{ opacity: 0, y: 50 }}
            className="sm:border sm:border-white/15 rounded-2xl w-full p-2 sm:p-8 flex flex-col gap-6"
          >
            <h1 className="text-3xl font-bold text-center text-white">
              Contact Me
            </h1>
            <p className="text-center text-gray-400 text-sm">
              Feel free to send a message. I'll respond as soon as possible.
              Thanks for reaching out!
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name and Email */}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500"
                  required
                />
              </div>

              {/* Message Area */}
              <textarea
                name="message"
                placeholder="Message"
                className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500 resize-none min-h-50 mb-5"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-white/90 transition-colors"
              >
                Submit Message →
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-gray-700 " />

            {/* Botones sociales */}
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/mirchez"
                target="_blank"
                rel="noopener noreferrer"
                className={iconsClass}
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href="https://Linkedin.com/in/mirchez"
                target="_blank"
                rel="noopener noreferrer"
                className={iconsClass}
              >
                <Linkedin size={18} />
                Linkedin
              </a>

              <button onClick={handleGmailClick} className={iconsClass}>
                <Mail size={18} />
                Gmail
              </button>
            </div>

            {/* Link opcional para volver */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-gray-400 hover:text-purple-500 text-sm"
              >
                ← Back To Home
              </Link>
            </div>
          </motion.div>
        </Tilt>
      </AnimatePresence>
    </div>
  );
}
