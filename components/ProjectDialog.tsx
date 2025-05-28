'use client';

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Gitlab } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  github?: string;
  gitlab?: string;
  tech: string[];
}

interface ProjectDialogProps {
  project: Project | null;
}

const ProjectDialog = ({ project }: ProjectDialogProps) => {
  if (!project) return null;
  
  return (
    <DialogContent
      className="max-w-2xl bg-cream-50/90 dark:bg-gray-800/90"
    >
      <div className="space-y-4">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            quality={80}
          />
        </div>
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
          )}
          {project.gitlab && (
            <a
              href={project.gitlab}
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
  );
};

export default ProjectDialog; 