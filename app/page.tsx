'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useTheme } from 'next-themes';

interface Skill {
  name: string;
  icon: string;
  category: 'Languages' | 'Frameworks' | 'Tools';
}

interface Project {
  title: string;
  description: string;
  image: string;
  github?: string;
  gitlab?: string;
  tech: string[];
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const skills: Skill[] = [
    // Languages
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'Languages',
    },
    {
      name: 'C++',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      category: 'Languages',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      category: 'Languages',
    },
    {
      name: 'Go',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      category: 'Languages',
    },
    {
      name: 'LLVM',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/llvm/llvm-original.svg',
      category: 'Languages',
    },
    // Frameworks
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frameworks',
    },
    {
      name: 'Node',
      icon: 'https://nodejs.org/static/logos/nodejsLight.svg',
      category: 'Frameworks',
    },
    {
      name: 'Qt',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg',
      category: 'Frameworks',
    },
    {
      name: 'GTK',
      icon: 'https://wiki.gnome.org/attachments/Projects(2f)GTK(2f)Logo/gtk-logo.svg',
      category: 'Frameworks',
    },
    {
      name: 'Pandas',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      category: 'Frameworks',
    },
    {
      name: 'LLVM',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/llvm/llvm-original.svg',
      category: 'Frameworks',
    },
    // Tools
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'Tools',
    },
    {
      name: 'Linux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      category: 'Tools',
    },
    {
      name: 'GitHub',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      category: 'Tools',
    },
    {
      name: 'GitLab',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
      category: 'Tools',
    },
  ];

  const projects: Project[] = [
    {
      title: 'Project 1',
      description:
        'A sophisticated project showcasing my expertise in system programming and optimization techniques.',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
      github: 'https://github.com/yourusername/project1',
      gitlab: 'https://gitlab.com/yourusername/project1',
      tech: ['Python', 'C++', 'LLVM'],
    },
    {
      title: 'Project 2',
      description:
        'An innovative application that demonstrates my ability to create efficient and scalable solutions.',
      image:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
      github: 'https://github.com/yourusername/project2',
      gitlab: 'https://gitlab.com/yourusername/project1',
      tech: ['TypeScript', 'React', 'Go'],
    },
    {
      title: 'Project 3',
      description:
        'A cutting-edge tool that showcases my proficiency in modern development practices.',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
      gitlab: 'https://gitlab.com/yourusername/project3',
      github: 'https://gitlab.com/yourusername/project1',
      tech: ['Go', 'Qt', 'Linux'],
    },
  ];

  const categoryIcons = {
    Languages: <Code2 className="w-6 h-6" />,
    Frameworks: <Braces className="w-6 h-6" />,
    Tools: <Tool className="w-6 h-6" />,
  };

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

      {/* Header */}
      <header className="fixed left-0 top-0 right-0 p-6 flex justify-center items-center gap-4 z-50">
        <nav className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://gitlab.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Gitlab className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:your.email@example.com">
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </a>
          <div className="w-px h-5 bg-border mx-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:scale-110 transition-transform"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </nav>
      </header>

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
                A passionate developer from India, currently in class 12th,{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-1 rounded-lg blur-sm bg-primary/20 animate-pulse" />
                  <span className="relative text-primary font-semibold">
                    extersie in languages like Python, C/C++ etc 
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
            {projects.map((project, index) => (
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
    </main>
  );
}
