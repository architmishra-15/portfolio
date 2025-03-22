'use client';

import { useState, Suspense } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Github, Gitlab as GitlabLogoFill, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import projects from '@/data/projects.json';

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-48 md:h-56 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects.projects)[0] | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const dialogAnimation = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.main 
      className="min-h-screen bg-background relative overflow-hidden py-12 md:py-20 px-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.15),transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Home Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2 
          }}
        >
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.3 
          }}
          className="text-center space-y-4 mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A collection of projects that showcase my skills and passion for technology.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {projects.projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -5 }}
              layout
            >
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/60 backdrop-blur-sm border border-border hover:border-primary/20"
                onClick={() => setSelectedProject(project)}
              >
                <Suspense fallback={
                  <div className="h-48 md:h-56 bg-muted animate-pulse" />
                }>
                  <ProjectImage src={project.image} alt={project.title} />
                </Suspense>
                <CardContent className="p-4">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">{project.title}</h2>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tech?.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs md:text-sm bg-secondary/80 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-50"
              >
                <DialogContent className="max-w-2xl w-[95%] md:w-full overflow-hidden">
                  <motion.div
                    variants={dialogAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl md:text-2xl font-bold">
                        {selectedProject.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="relative h-48 md:h-64 my-4 rounded-lg overflow-hidden">
                      <Suspense fallback={
                        <div className="h-full bg-muted animate-pulse" />
                      }>
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </Suspense>
                    </div>
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base">
                        {selectedProject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech?.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs md:text-sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        {selectedProject.github && (
                          <motion.a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-4 w-4 md:h-5 md:w-5" />
                            GitHub
                          </motion.a>
                        )}
                        {selectedProject.gitlab && (
                          <motion.a
                            href={selectedProject.gitlab}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FC6D26] text-white hover:bg-[#FC6D26]/90 transition-colors text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <GitlabLogoFill className="h-4 w-4 md:h-5 md:w-5" />
                            GitLab
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </DialogContent>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}