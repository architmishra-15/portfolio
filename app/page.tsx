'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Github,
  Gitlab,
  Linkedin,
  Instagram,
  Mail,
  Moon,
  Sun,
  Code2,
  Braces,
  PenTool as Tool,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/ui/ContactDialog';
import { SocialMediaDialog } from '@/components/ui/SocialMediaDialog';
import { useTheme } from 'next-themes';
import skills from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  github?: string;
  gitlab?: string;
  tech: string[];
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    key={item.title}
                    className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center shadow-lg"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);
 
  // For mobile, use smaller fixed sizes
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
 
  // Use smaller sizes on mobile
  let widthTransform = useTransform(distance, [-150, 0, 150], isMobile ? [30, 40, 30] : [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], isMobile ? [30, 40, 30] : [40, 80, 40]);
 
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], isMobile ? [15, 20, 15] : [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], isMobile ? [15, 20, 15] : [20, 40, 20]);
 
  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
 
  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
 
  const [hovered, setHovered] = useState(false);
 
  return (
    <div onClick={onClick}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative cursor-pointer"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; onClick?: () => void }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl bg-background/80 backdrop-blur-sm border border-border px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [socialType, setSocialType] = useState<'instagram' | 'linkedin'>('instagram');
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(latest);
  });

  const categoryIcons = {
    Languages: <Code2 className="w-6 h-6" />,
    Frameworks: <Braces className="w-6 h-6" />,
    Tools: <Tool className="w-6 h-6" />,
  };

  const navItems = [
    {
      title: "GitHub",
      icon: <Github className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => window.open("https://github.com/architmishra-15", "_blank")
    },
    {
      title: "GitLab",
      icon: <Gitlab className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => window.open("https://gitlab.com/archit_mishra/", "_blank")
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => {
        setSocialType('linkedin');
        setSocialDialogOpen(true);
      }
    },
    {
      title: "Instagram",
      icon: <Instagram className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => {
        setSocialType('instagram');
        setSocialDialogOpen(true);
      }
    },
    {
      title: "Mail",
      icon: <Mail className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => window.open("mailto:your.email@example.com", "_blank")
    },
    {
      title: theme === 'dark' ? "Light Mode" : "Dark Mode",
      icon: theme === 'dark' ? <Sun className="h-4 w-4 md:h-6 md:w-6" /> : <Moon className="h-4 w-4 md:h-6 md:w-6" />,
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.15),transparent)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(var(--chart-1), 0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Floating Dock Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ 
          duration: 0.2,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4"
      >
        <FloatingDockDesktop items={navItems} className="shadow-lg" />
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-28 pb-20 md:pt-32 md:pb-0">
        <div className="max-w-5xl mx-auto relative">
          {/* Animated background elements */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-primary/10 blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute right-0 w-80 h-80 rounded-full bg-secondary/10 blur-xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 w-40 h-40 rounded-full bg-accent/10 blur-xl"
              animate={{
                x: [-50, 100, -50],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8 relative z-10"
          >
            {/* Animated greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-2xl font-medium text-primary/80"
            >
              <span className="inline-block">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome to my portfolio
                </motion.span>
              </span>
            </motion.div>

            {/* Name with text reveal effect */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="relative inline-block"
              >
                <motion.div
                  className="absolute -inset-1 rounded-lg blur-xl opacity-75 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-4xl md:text-7xl font-bold tracking-tighter"
                  >
                    Hi, I am{' '}
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  >
                    Archit Mishra
                  </motion.h1>
                  <motion.span
                    initial={{ opacity: 0, rotate: -20, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                    className="inline-block text-4xl md:text-7xl origin-bottom-right"
                  >
                    👋
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Role description with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="relative"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              >
                A developer from India, currently in class 12th,{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-1 rounded-lg blur-sm bg-primary/20 animate-pulse" />
                  <span className="relative text-primary font-semibold">
                    expertise in languages like Python, C/C++ etc 
                  </span>
                </span>
                .
              </motion.p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                  onClick={() => {
                    document
                      .getElementById('projects')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Projects
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 shadow-lg"
                  onClick={() => setContactOpen(true)}
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            {/* Skills Grid */}
            <div className="mt-16 space-y-10">
              {(['Languages', 'Frameworks', 'Tools'] as const).map(
                (category) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.3,
                        }}
                      >
                        {categoryIcons[category]}
                      </motion.div>
                      <h2 className="text-xl font-semibold">{category}</h2>
                    </motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow:
                                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                              transition: { duration: 0.2 },
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all"
                          >
                            <motion.div
                              whileHover={{ rotate: 10 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-8 h-8"
                              />
                            </motion.div>
                            <span className="font-medium text-sm md:text-base">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={() => setSelectedProject(null)}
          >
            <DialogContent className="max-w-2xl">
              <div className="space-y-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <p className="text-muted-foreground">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </a>
                  )}
                  {selectedProject.gitlab && (
                    <a
                      href={selectedProject.gitlab}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <Gitlab className="mr-2 h-4 w-4" />
                        GitLab
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <SocialMediaDialog 
        open={socialDialogOpen} 
        onOpenChange={setSocialDialogOpen} 
        socialType={socialType} 
      />
    </main>
  );
}