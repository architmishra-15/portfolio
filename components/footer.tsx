'use client';

import Link from 'next/link';
import { Github, Gitlab, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Archit Mishra</h3>
            <p className="text-sm text-muted-foreground">
              Student, developer, and enthusiast. Building the future one line of code at a time.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              
            </nav>
          </div>
          
          {/* Column 3: Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/architmishra-15" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://gitlab.com/archit_mishra" target="_blank" rel="noopener noreferrer">
                <Gitlab className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">GitLab</span>
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Archit Mishra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}