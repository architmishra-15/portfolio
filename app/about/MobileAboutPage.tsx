'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, ChevronDown, Home, ExternalLink } from 'lucide-react';
import styles from './about.module.css';
import { cn } from '@/lib/utils';
import skillsData from '@/data/skills.json';
import timelineData from '@/data/timeline.json';

export default function MobileAboutPage() {
  const [activeSection, setActiveSection] = useState('intro');
  
  // Simplified timeline data for mobile
  const timelineEvents = timelineData;

  // Process skills data for display
  const skills = [
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

  // Section references for scrolling
  const sectionRefs = {
    intro: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  // Function to scroll to section
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <main className={cn("relative min-h-screen", styles.bg)}>
      {/* Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className={cn("flex items-center gap-2 backdrop-blur-sm", styles.card)}>
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      {/* Simplified background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className={cn("absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5", styles.bg)} />
      </div>

      {/* Intro Section */}
      <section 
        ref={sectionRefs.intro} 
        id="intro" 
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-24"
      >  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className={cn("text-4xl font-bold mb-4", styles.gradientText)}>
            Archit Mishra
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Student & Aspiring Developer
          </p>
          
          <div className="w-full max-w-md mx-auto">
            <div className={cn("backdrop-blur-sm border p-6 rounded-xl", styles.gradientCard)}>
              <p className="text-base leading-relaxed mb-6">
                I'm a passionate student from India, exploring the world of development, and programming. 
                This is my journey of coding, and continuous learning.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="https://github.com/architmishra-15" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/archit-mishra-10448a319/" target="_blank">
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
            </div>
          </div>
          
          <div className="mt-8 animate-bounce">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground flex flex-col items-center gap-2"
            >
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section 
        ref={sectionRefs.about}
        id="about" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4 inline-block">
              <span className="relative">
                About Me
                <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
              </span>
            </h2>
            <div className="space-y-4 text-base">
              <p>
                Hello! I'm Archit, a student with a passion for technology and programming. 
                My journey in the world of coding began with simple `Hello World` printing in Pyhton and has evolved into 
                creating modern applications, project building, and exploring new technologies.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={cn("p-6 rounded-xl border", styles.card)}>
              <h3 className={cn("text-lg font-semibold mb-4", styles.primaryText)}>Quick Facts</h3>
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
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={sectionRefs.skills}
        id="skills" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4 inline-block">
              <span className="relative">
                Skills & Expertise
                <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
              </span>
            </h2>
            <p className="text-muted-foreground">
              Here are some of the technologies and tools I've been working with during my programming journey.
            </p>
          </motion.div>

          <div className="space-y-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={cn("backdrop-blur-sm border", styles.card)}>
                  <div className="p-4">
                    <h3 className={cn("text-lg font-semibold mb-3", styles.primaryText)}>{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <span 
                          key={idx}
                          className={cn("px-3 py-1 rounded-full text-sm flex items-center gap-1", styles.mutedBg)}
                        >
                          <span className={cn("h-1.5 w-1.5 rounded-full", styles.primaryBg)}></span>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={sectionRefs.timeline}
        id="timeline" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4 inline-block">
              <span className="relative">
                My Journey
                <span className={cn("absolute -bottom-1 left-0 w-full h-1 rounded-full", styles.primaryBg)}></span>
              </span>
            </h2>
            <p className="text-muted-foreground">
              A timeline of key moments and milestones in my programming journey.
            </p>
          </motion.div>
          
          <div className="relative mt-16">
            {/* Creative Mobile Timeline - Card Deck */}
            <div className="relative">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 80, rotateZ: index % 2 === 0 ? -3 : 3 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    rotateZ: 0
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  className="mb-16 relative"
                  style={{ zIndex: timelineEvents.length - index }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 blur-xl -z-10" />
                  
                  <div className={cn(
                    "relative p-1 rounded-xl overflow-hidden",
                    index % 3 === 0 ? styles.gradientBg : 
                    index % 3 === 1 ? styles.accentGradient : 
                    "bg-gradient-to-r from-purple-400/20 to-primary/20"
                  )}>
                    <div className={cn("backdrop-blur-md border p-5 rounded-lg", styles.card)}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={cn("flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 border", styles.primaryBg, "bg-opacity-10 border-opacity-30")}
                             style={{ background: 'rgba(255, 255, 255, 0.85)', borderWidth: 2, borderColor: '#e0c9a6' }}>
                          <span className={cn(styles.primaryText, "font-bold text-base md:text-lg")}>{event.year}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <div className={cn("h-1 w-12 rounded-full mt-1 mb-2", styles.primaryBg, "opacity-40")}></div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          index % 3 === 0 ? styles.primaryBg + ' bg-opacity-10 ' + styles.primaryText : 
                          index % 3 === 1 ? styles.accentBg + ' bg-opacity-10 ' + styles.accentText : 
                          styles.secondaryBg + ' bg-opacity-10 ' + styles.secondaryText
                        )}>
                          {calculateDuration(event.year)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section 
        ref={sectionRefs.contact}
        id="contact" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={cn("backdrop-blur-sm border p-6 rounded-xl text-center", styles.gradientCard)}
          >
            <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
            <p className="text-base text-muted-foreground mb-6">
              I'm always open to discussing new opportunities, projects, or just having a chat about technology and coding.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className={cn("flex items-center p-3 rounded-lg", styles.card)}>
                <Mail className={cn("h-5 w-5 mr-3", styles.primaryText)} />
                <div className="text-left">
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-xs text-muted-foreground">architmishra015@gamil.com</p>
                </div>
              </div>
              
              <div className={cn("flex items-center p-3 rounded-lg", styles.card)}>
                <Github className={cn("h-5 w-5 mr-3", styles.primaryText)} />
                <div className="text-left">
                  <h3 className="text-sm font-medium">GitHub</h3>
                  <p className="text-xs text-muted-foreground">github.com/architmishra-15</p>
                </div>
              </div>
              
              <div className={cn("flex items-center p-3 rounded-lg", styles.card)}>
                <Linkedin className={cn("h-5 w-5 mr-3", styles.primaryText)} />
                <div className="text-left">
                  <h3 className="text-sm font-medium">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/archit-mishra-10448a319/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline">linkedin.com/in/archit-mishra-10448a319</a>
                </div>
              </div>
            </div>
            
            <Link href="/contact">
              <Button className={cn("w-full gap-2 text-white", styles.gradientBg, "hover:opacity-90")}>
                Visit Contact Page
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function calculateDuration(year: string): string {
  const startYear = parseInt(year);
  const currentYear = new Date().getFullYear();
  const diff = currentYear - startYear;
  
  if (diff === 0) {
    return "This year";
  } else if (diff === 1) {
    return "1 year ago";
  } else {
    return `${diff} years ago`;
  }
} 