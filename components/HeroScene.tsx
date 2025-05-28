'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export function HeroScene({ onViewProjects, onContactMe }: { 
  onViewProjects: () => void;
  onContactMe: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Particle animation
  useEffect(() => {
    if (!canvasRef.current || initialized) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create particles
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      originalX: number;
      originalY: number;
    }> = [];

    const createParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 10000),
        150
      );
      
      particles = [];

      const colors = isDark 
        ? ['#4F46E5', '#7C3AED', '#8B5CF6', '#6366F1', '#4338CA']  // Purple/blue palette for dark mode
        : ['#6366F1', '#818CF8', '#A5B4FC', '#4F46E5', '#4338CA'];  // Lighter purple/blue for light mode

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        };

        particles.push({
          x,
          y,
          radius,
          color,
          velocity,
          originalX: x,
          originalY: y,
        });
      }
    };

    // Animation
    let animationFrameId: number;
    const maxDistance = 120;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Bounce off edges
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.velocity.x = -particle.velocity.x;
        }
        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
          particle.velocity.y = -particle.velocity.y;
        }

        // Mouse interaction
        if (isHovering) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const force = -maxDistance / distance;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            particle.velocity.x += directionX * force * 0.02;
            particle.velocity.y += directionY * force * 0.02;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) {
            ctx.beginPath();
            ctx.strokeStyle = isDark 
              ? `rgba(99, 102, 241, ${0.6 - distance / 100})`
              : `rgba(79, 70, 229, ${0.4 - distance / 150})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();
    setInitialized(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [initialized, mousePosition, isHovering, isDark]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const nameText = "Archit Mishra";
  const nameArray = Array.from(nameText);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Particle Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 shadow-glow">
            <GitBranch className="mr-1 h-3.5 w-3.5" />
            <span>Student & Developer</span>
          </div>
        </motion.div>

        {/* Main Title with Letter Animation */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="sr-only">Archit Mishra</span>
          <span className="inline-block" aria-hidden="true">
            {nameArray.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                variants={letterVariants}
                className={cn(
                  "inline-block",
                  letter === " " ? "mr-4" : "mr-0",
                  "bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                )}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl"
        >
          I build modern, responsive web applications with a focus on accessibility and user experience.
        </motion.div>

        {/* Tech stack circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { name: 'JavaScript', color: 'bg-yellow-400' },
            { name: 'React', color: 'bg-blue-400' },
            { name: 'Next.js', color: 'bg-black dark:bg-white' },
            { name: 'Node.js', color: 'bg-green-500' },
            { name: 'TypeScript', color: 'bg-blue-600' },
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.7 + index * 0.1, type: 'spring' }}
              className={`flex items-center gap-2 rounded-full px-3 py-1 bg-opacity-10 dark:bg-opacity-10 border border-opacity-20 ${tech.color.replace('bg-', 'bg-')}/10`}
            >
              <span className={`h-2 w-2 rounded-full ${tech.color}`} />
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={onViewProjects}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg shadow-indigo-500/20 px-6 py-6 text-lg"
          >
            View Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            onClick={onContactMe}
            variant="outline"
            className="bg-white/5 backdrop-blur-sm border-2 border-indigo-500/20 hover:border-indigo-500/40 rounded-full px-6 py-6 text-lg"
          >
            Contact Me
          </Button>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-16 flex items-center gap-2"
        >
          <Github className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Find me on GitHub: 
            <a 
              href="https://github.com/architmishra-15" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              @architmishra-15
            </a>
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-5 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1 h-1 bg-indigo-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
} 