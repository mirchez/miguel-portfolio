"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";
import { Tilt } from "./ui/tilt";
import { useActionState } from "react";
import { sendContactEmail, ContactFormState } from "../actions/actions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
  );
}

function getGmailLink() {
  if (typeof navigator === "undefined")
    return "mailto:mmirandasanchez16@gmail.com";

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const email = "mmirandasanchez16@gmail.com";
  const subject = "Contact from Portfolio";

  if (isMobile) {
    if (isIOS()) {
      // iOS - intentamos abrir Gmail primero, si no funciona usamos mailto
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    } else {
      // Android - intentamos múltiples opciones
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
  }
  // Desktop - abrimos Gmail web
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject
  )}`;
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    sendContactEmail,
    {
      success: false,
      message: "",
    }
  );

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Message sent successfully!");
      reset();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, reset]);

  const handleGmailClick = () => {
    const link = getGmailLink();
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(link);
    } else {
      window.location.href = link;
    }
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
            className="bg-gray-800/30 sm:border sm:border-white/15 rounded-2xl w-full p-2 sm:p-8 flex flex-col gap-6"
          >
            <h1 className="text-3xl font-bold text-center text-white">
              Contact Me
            </h1>
            <p className="text-center text-gray-400 text-sm">
              Feel free to send a message. I&apos;ll respond as soon as
              possible. Thanks for reaching out!
            </p>

            {/* Formulario */}
            <form action={formAction} className="flex flex-col gap-4">
              {/* Name and Email */}
              <div className="flex gap-4">
                <div className="w-full">
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    placeholder="Name"
                    className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Area */}
              <div>
                <textarea
                  {...register("message")}
                  name="message"
                  id="message"
                  autoComplete="off"
                  placeholder="Message"
                  className="w-full bg-black/30 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500 resize-none min-h-50 mb-5"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-white/90 transition-colors"
              >
                Submit Message →
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-gray-700" />

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
