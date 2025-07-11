"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Mail,
  Linkedin,
  Send,
  ArrowLeft,
  User,
  MessageSquare,
} from "lucide-react";
import { useActionState } from "react";
import { sendContactEmail, ContactFormState } from "../actions/actions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    } else {
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
  }
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

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/mirchez",
      description: "View my repositories",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/mirchez",
      description: "Professional network",
    },
    {
      icon: Mail,
      label: "Gmail",
      href: "#",
      description: "Send direct email",
      onClick: handleGmailClick,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
              className="text-center space-y-4"
            >
              <h1 className="text-3xl font-bold tracking-tight">
                Get In Touch
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I&apos;d love to hear from you. Send me a message and I&apos;ll
                respond as soon as possible.
              </p>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="lg:col-span-2"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Send Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <form
                      action={formAction}
                      className="space-y-6 flex-1 flex flex-col"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            autoComplete="email"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or just say hello..."
                          className="min-h-32 flex-1"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full mt-auto">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info & Social */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Contact Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        Usually within 24 hours
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Available for remote work
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Languages</p>
                      <p className="text-sm text-muted-foreground">
                        English, Spanish
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Connect With Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {socialLinks.map((link) => (
                        <Button
                          key={link.label}
                          variant="outline"
                          className="w-full justify-start gap-3 h-12"
                          asChild={!link.onClick}
                          onClick={link.onClick}
                        >
                          {link.onClick ? (
                            <>
                              <link.icon className="h-4 w-4" />
                              <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">
                                  {link.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {link.description}
                                </span>
                              </div>
                            </>
                          ) : (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 w-full"
                            >
                              <link.icon className="h-4 w-4" />
                              <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">
                                  {link.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {link.description}
                                </span>
                              </div>
                            </a>
                          )}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="text-center pt-8"
            >
              <Separator className="mb-8" />
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
