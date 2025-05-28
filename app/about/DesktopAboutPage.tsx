'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, ChevronDown, Home, ExternalLink } from 'lucide-react';
import styles from './about.module.css';
import { cn } from '@/lib/utils';
import skillsData from '@/data/skills.json';
import timelineData from '@/data/timeline.json';

export default function DesktopAboutPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax effect for background elements
  const backgroundY1 = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const backgroundY2 = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  
  // For 3D card rotation effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    setMousePosition({ x, y: -y }); // Invert Y for natural tilt
  };

  // Sections for intersection observation
  const sections = ['intro', 'about', 'skills', 'timeline', 'contact'];
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  
  // Update active section based on scroll position
  useEffect(() => {
    const observers = sections.map((_, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sections[index]);
          }
        });
      }, { threshold: 0.6 });
      
      if (sectionRefs.current[index]) {
        observer.observe(sectionRefs.current[index]!);
      }
      
      return observer;
    });
    
    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs.current[index]) {
          observer.unobserve(sectionRefs.current[index]!);
        }
      });
    };
  }, [sections]);

  // Process skills data for display
  const processedSkills = [
    {
      category: "Languages",
      items: skillsData
        .filter(skill => skill.category === "Languages")
        .slice(0, 4)
        .map(skill => skill.name)
    },
    {
      category: "Frameworks",
      items: skillsData
        .filter(skill => skill.category === "Frameworks")
        .slice(0, 4)
        .map(skill => skill.name)
    },
    {
      category: "Tools",
      items: skillsData
        .filter(skill => skill.category === "Tools")
        .slice(0, 4)
        .map(skill => skill.name)
    }
  ];

  // Timeline data
  const timelineEvents = timelineData;

  return (
    <main className={cn("relative min-h-screen", styles.bg)} ref={containerRef}>
      {/* Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className={cn("flex items-center gap-2 backdrop-blur-sm", styles.card)}>
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-6">
          {sections.map((section, i) => (
            <button
              key={section}
              onClick={() => {
                sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative"
            >
              <div 
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  activeSection === section 
                    ? styles.primaryBg + ' scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
              <span 
                className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity capitalize whitespace-nowrap ${
                  activeSection === section ? styles.primaryText : 'text-muted-foreground'
                }`}
              >
                {section}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(var(--about-primary),0.2),transparent)]"
          style={{ y: backgroundY1 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_80%,rgba(var(--about-secondary),0.15),transparent)]"
          style={{ y: backgroundY2 }}
        />
        <div className={cn("absolute inset-0", styles.bg, "opacity-90")} />
      </div>

      {/* Intro Section with 3D hover effect */}
      <section 
        ref={el => sectionRefs.current[0] = el} 
        id="intro" 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl"
        >
          <h1 className={cn("text-5xl md:text-7xl font-bold mb-6", styles.gradientText)}>
            Archit Mishra
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Student & Aspiring Developer
          </p>
          
          <motion.div 
            className="perspective-500 w-full max-w-xl mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            style={{
              perspective: '1000px'
            }}
          >
            <motion.div 
              className={cn(styles.gradientCard, "backdrop-blur-sm p-8 rounded-xl shadow-lg")}
              style={{
                rotateX: mousePosition.y,
                rotateY: mousePosition.x,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <p className="text-lg leading-relaxed mb-6">
              I'm a passionate student from India, exploring the world of development, and programming. 
              This is my journey of coding, and continuous learning.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="https://github.com/architmishra-15" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:architmishra015@gmail.com">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <button 
              onClick={() => sectionRefs.current[1]?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground flex flex-col items-center gap-2"
            >
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section 
        ref={el => sectionRefs.current[1] = el} 
        id="about" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
                <span className="relative">
                  About Me
                  <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
                </span>
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                Hello! I'm Archit, a student with a passion for technology and programming. 
                My journey in the world of coding began with simple `Hello World` printing in Pyhton and has evolved into 
                creating modern applications, project building, and exploring new technologies.
                </p>
                <p>
                  I believe in the power of continuous learning and strive to improve my capabilities everytime I get the chance, if not every day.
                  My goal is to leverage technology to solve real-world problems and create meaningful experiences.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative">
                <div className={cn("absolute -inset-0.5 rounded-xl blur opacity-20", styles.gradientBg)}></div>
                <div className={cn("relative p-6 rounded-xl border shadow-lg", styles.card)}>
                  <h3 className={cn("text-xl font-semibold mb-4", styles.primaryText)}>Quick Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className={cn("flex-shrink-0 w-2 h-2 mt-2 rounded-full", styles.primaryBg)}></span>
                      <span>Class 12th passed science with computer science</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn("flex-shrink-0 w-2 h-2 mt-2 rounded-full", styles.primaryBg)}></span>
                      <span>Self-taught programmer with focus on web development, low level optimizations and high level technologies like Machine Learning, NLP, Cloud Computing, etc.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn("flex-shrink-0 w-2 h-2 mt-2 rounded-full", styles.primaryBg)}></span>
                      <span>Participant in many online coding competitions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn("flex-shrink-0 w-2 h-2 mt-2 rounded-full", styles.primaryBg)}></span>
                      <span>Working on building a portfolio of projects to showcase skills of different technologies and domains</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn("flex-shrink-0 w-2 h-2 mt-2 rounded-full", styles.primaryBg)}></span>
                      <span>Interested in Low level architecture, Machine Learning, Cyber Security, and Backend Development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section with animated cards */}
      <section 
        ref={el => sectionRefs.current[2] = el} 
        id="skills" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block">
              <span className="relative">
                Skills & Expertise
                <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of the technologies and tools I've been working with during my programming journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processedSkills.map((skillGroup, index) => (
              <SkillCard key={index} category={skillGroup.category} items={skillGroup.items} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={el => sectionRefs.current[3] = el} 
        id="timeline" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block">
              <span className="relative">
                My Journey
                <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A timeline of key moments and milestones in my programming journey.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className={cn("absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1", styles.mutedBg)}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true, margin: "-100px" }}
            />
            
            <div className="space-y-36 relative">
              {timelineEvents.map((event, index) => (
                <TimelineEvent 
                  key={index} 
                  year={event.year} 
                  title={event.title} 
                  description={event.description} 
                  isLeft={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section 
        ref={el => sectionRefs.current[4] = el} 
        id="contact" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className={cn("absolute -inset-1 rounded-2xl blur-xl opacity-70", styles.gradientBg)}></div>
            <div className={cn("relative backdrop-blur-lg border p-10 rounded-2xl text-center", styles.card, styles.gradientBorder)}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, projects, or just having a chat about technology and coding.
                Feel free to reach out via any of these channels:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Link href="mailto:architmishra015@gmail.com">
                <div className={cn("flex flex-col items-center p-4 rounded-lg hover:bg-background/80 transition-colors", styles.card)}>
                  <Mail className={cn("h-8 w-8 mb-3", styles.primaryText)} />
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">architmishra015@gmail.com</p>
                </div>
                </Link>
                <Link href="https://github.com/architmishra-15" target="_blank">
                <div className={cn("flex flex-col items-center p-4 rounded-lg hover:bg-background/80 transition-colors", styles.card)}>
                  <Github className={cn("h-8 w-8 mb-3", styles.primaryText)} />
                  <h3 className="font-medium">GitHub</h3>
                  <p className="text-sm text-muted-foreground">github.com/architmishra-15</p>
                </div>
                </Link>

                <Link href="https://www.linkedin.com/in/archit-mishra-10448a319/" target="_blank">
                <div className={cn("flex flex-col items-center p-4 rounded-lg hover:bg-background/80 transition-colors", styles.card)}>
                  <Linkedin className={cn("h-8 w-8 mb-3", styles.primaryText)} />
                  <h3 className="font-medium">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">Connect with me</p>
                </div>
                </Link>
              </div>
              
              <Link href="/contact">
                <Button className={cn("gap-2 text-white", styles.gradientBg, "hover:opacity-90")}>
                  Visit Contact Page
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Skill Card Component
function SkillCard({ category, items, index }: { category: string; items: string[]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-full"
    >
      <div className={cn("absolute -inset-0.5 rounded-xl blur opacity-30", styles.gradientBg)}></div>
      <Card className={cn("h-full backdrop-blur-sm border relative", styles.card)}>
        <div className="p-6">
          <h3 className={cn("text-xl font-semibold mb-4", styles.primaryText)}>{category}</h3>
          <ul className="space-y-3">
            {items.map((skill, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", styles.primaryBg)}></span>
                <span>{skill}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

// Timeline Event Component
function TimelineEvent({ 
  year, 
  title, 
  description, 
  isLeft,
  index
}: { 
  year: string; 
  title: string; 
  description: string; 
  isLeft: boolean;
  index: number;
}) {
  const eventRef = useRef(null);
  const isInView = useInView(eventRef, { once: true, margin: "-100px" });
  
  return (
    <div className="relative" ref={eventRef}>
      <motion.div
        className={cn(`absolute top-0 left-[49.2%] -translate-x-1/2 h-6 w-6 rounded-full bg-primary/20 border-2 flex items-center justify-center`)}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      >
        <div className={cn("h-2 w-2 rounded-full", styles.primaryBg)}></div>
      </motion.div>
      
      <motion.div 
        className={`
          w-full md:w-[calc(50%-2rem)] 
          ${isLeft ? 'md:pr-8 md:mr-auto' : 'md:pl-8 md:ml-auto'}
        `}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      >
        <div className={cn("backdrop-blur-sm border p-6 rounded-lg relative", styles.card)}>
          <div className={cn("absolute -top-3 left-4 px-2 py-1 text-sm font-bold rounded", styles.primaryBg, "text-white")}>
            {year}
          </div>
          <h3 className="text-xl font-semibold mt-2 mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </motion.div>
    </div>
  );
} 