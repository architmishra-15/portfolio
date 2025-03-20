'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const [count, setCount] = useState(10);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      window.location.href = '/';
    }
  }, [count]);

  const digits = Array.from('404');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <svg
          className="absolute left-0 right-0 top-0 h-full w-full stroke-primary/5"
          fill="none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={10 * i}
              x2="100"
              y2={10 * i + 5}
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.1, 0.2, 0.1],
                transition: { 
                  duration: 2 + i, 
                  repeat: Infinity, 
                  repeatType: 'reverse' 
                } 
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        {/* 404 with animated digits */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {digits.map((digit, i) => (
            <motion.div
              key={i}
              className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ 
                y: -100, 
                opacity: 0,
                rotateY: 90
              }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotateY: 0
              }}
              transition={{ 
                delay: i * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              {digit}
            </motion.div>
          ))}
        </motion.div>

        {/* Glowing effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            background: [
              'radial-gradient(circle, rgba(79,70,229,0.4) 0%, rgba(79,70,229,0) 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(147,51,234,0) 70%)',
              'radial-gradient(circle, rgba(219,39,119,0.4) 0%, rgba(219,39,119,0) 70%)',
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Error message */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          The page you're looking for doesn't exist or has been moved. 
          You'll be redirected to the homepage in {count} seconds.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="/">
            <Button 
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
              aria-label="Go home"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="outline"
            className="rounded-full border-2 shadow-lg"
            onClick={() => window.location.reload()}
            aria-label="Refresh page"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-sm">
          <Link href="https://github.com/architmishra-15" className="inline-flex items-center hover:text-primary transition-colors">
            <Github className="h-4 w-4 mr-1" />
            Find me on GitHub
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </p>
      </motion.div>
    </div>
  );
}