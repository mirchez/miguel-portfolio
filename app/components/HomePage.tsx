"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Zap,
  Users,
  ExternalLink,
  ArrowRight,
  FolderOpen,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsScrolled } from "@/lib/isScrolled";

export default function HomePage() {
  const { isMounted, isScrolled } = useIsScrolled();

  const techStack = [
    { name: "React", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    {
      name: "Next.js",
      color: "bg-black text-gray-300 border-gray-500/20",
    },
    {
      name: "TypeScript",
      color: "bg-blue-600/10 text-blue-400 border-blue-600/20",
    },
    {
      name: "Node.js",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      name: "MongoDB",
      color: "bg-green-600/10 text-green-400 border-green-600/20",
    },
    {
      name: "Tailwind",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
  ];

  const stats = [
    { icon: Code, label: "Years Coding", value: "3+" },
    { icon: Zap, label: "Projects Built", value: "25+" },
    { icon: Users, label: "Years Experience", value: "1+" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/mirchez" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mirchez",
    },
    { icon: Mail, label: "Email", href: "mailto:mmirandasanchez16@gmail.com" },
  ];

  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Portfolio Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : -100,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-muted">
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight">
                  Portfolio
                </h2>
                <p className="text-xs text-muted-foreground">10+ projects</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                href="https://github.com/mirchez"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="ghost" className="h-8">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="sm" className="h-8">
                  <ArrowUpRight className="mr-2 h-3 w-3" />
                  Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Portfolio Highlight Section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: isScrolled ? 0.95 : 1,
                  opacity: isScrolled ? 0.8 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="hover:shadow-md transition-all duration-300 overflow-hidden">
                  <motion.div
                    animate={{
                      height: isScrolled ? "auto" : "auto",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <motion.div
                        animate={{
                          scale: isScrolled ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{
                              scale: isScrolled ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="p-2 rounded-md bg-muted"
                          >
                            <FolderOpen className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                          <div>
                            <motion.h2 className="font-semibold tracking-tight">
                              Portfolio
                            </motion.h2>
                            <motion.p
                              animate={{
                                opacity: isScrolled ? 0.8 : 1,
                              }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="text-sm text-muted-foreground"
                            >
                              10+ projects • Real-world solutions
                            </motion.p>
                          </div>
                        </div>

                        <motion.div
                          animate={{
                            scale: isScrolled ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex gap-2 justify-end items-center mt-2 sm:mt-0"
                        >
                          <Link
                            href="https://github.com/mirchez"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="ghost" className="h-8">
                              <Github className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href="/projects">
                            <Button size="sm" className="h-8">
                              <ArrowUpRight className="mr-2 h-3 w-3" />
                              <span className="hidden sm:inline">
                                View Projects +10
                              </span>
                              <span className="sm:hidden">Projects</span>
                            </Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <Avatar className="h-28 w-28 border-2 border-border/50">
                  <AvatarImage src="/profile.jpg" alt="Miguel Miranda" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Miguel Miranda
                </h1>
                <p className="text-lg text-muted-foreground">
                  Full Stack Developer
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Systems Engineering Student</span>
                </div>
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Turning ideas into fast, scalable, and reliable web applications
                with React and Next.js, driven by a strong commitment to quality
                and innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button asChild>
                  <a href="mailto:mmirandasanchez16@gmail.com">
                    Get In Touch
                    <Mail className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Link href="/contact">
                  <Button variant="outline">
                    Let&apos;s Collaborate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* About Card */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I&apos;m a 21-year-old Fullstack Developer with a solid
                      Frontend focus, currently studying Systems Engineering.
                      I&apos;m passionate about AI, machine learning, and LLMs.
                      I&apos;m mostly self-taught, super committed, and I really
                      take ownership of the projects I work on.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I&apos;m known for being responsible, proactive,
                      dedicated, and always up for a challenge, especially when
                      it comes to learning new tech and contributing to projects
                      with real potential and impact.
                    </p>
                  </CardContent>
                </Card>

                {/* Experience Card */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I&apos;ve been programming for over three years and have
                      more than a year of hands-on experience in building
                      projects with React, TypeScript, Node.js, MongoDB, and
                      Next.js.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I&apos;m all about creating scalable, high-performance web
                      apps that actually make a difference for users. Always
                      learning and keeping up with the latest tech.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium">
                              {stat.label}
                            </span>
                          </div>
                          <span className="text-lg font-bold">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Let&apos;s Connect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {socialLinks.map((link) => (
                        <Button
                          key={link.label}
                          asChild
                          variant="outline"
                          className="w-full justify-between group"
                        >
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <link.icon className="h-4 w-4" />
                              <span>{link.label}</span>
                            </span>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Tech Stack Section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        className={`${tech.color} transition-all hover:scale-105`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
