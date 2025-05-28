'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FolderKanban, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  color: string;
};

export function FloatingDock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDock, setShowDock] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const dockRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const navItems: NavItem[] = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="h-5 w-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'About',
      path: '/about',
      icon: <User className="h-5 w-5" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <FolderKanban className="h-5 w-5" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: <Mail className="h-5 w-5" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide dock when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowDock(false);
      } else {
        setShowDock(true);
      }
      
      // Store current scroll position
      setLastScrollY(currentScrollY);
      
      // Auto-collapse expanded menu when scrolling
      if (isExpanded && Math.abs(currentScrollY - lastScrollY) > 50) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isExpanded]);
  
  // Close on outside click (only when expanded and mobile)
  useEffect(() => {
    if (!isExpanded || !isMobile) return;
    function handleClick(e: MouseEvent) {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isExpanded, isMobile]);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Don't render the dock on the main page (AFTER all hooks)
  if (pathname === '/') {
    return null;
  }

  return (
    <AnimatePresence>
      {showDock && (
        <>
          {/* Overlay for mobile expanded */}
          {isMobile && isExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
          )}
          <motion.div
            className={cn(
              isMobile ? 'fixed left-0 w-full flex flex-col items-center z-50' : 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50',
              isMobile ? 'bottom-16' : ''
            )}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            <div className="relative w-full flex flex-col items-center z-50">
              <motion.div
                ref={dockRef}
                initial={false}
                animate={{
                  width: isMobile && isExpanded ? '100vw' : isMobile ? '3.5rem' : isExpanded ? 'auto' : '3.5rem',
                  borderRadius: isMobile ? '0.75rem' : '2rem',
                }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className={cn(
                  'flex items-center p-1.5 backdrop-blur-lg z-50',
                  'border border-purple-300/30 dark:border-purple-700/30 shadow-lg',
                  'bg-gradient-to-r from-purple-500/90 to-blue-600/90 dark:from-purple-800/90 dark:to-blue-900/90',
                  isMobile && 'mx-auto w-full justify-center'
                )}
                style={isMobile && isExpanded ? { maxWidth: '100vw', borderRadius: '0.75rem' } : {}}
              >
                {/* Toggle Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-50"
                >
                  {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                {/* Navigation Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className={cn(
                        isMobile ? 'flex flex-col w-full px-2 py-3 space-y-2 ml-0' : 'flex space-x-1.5 ml-1.5',
                        'z-50'
                      )}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: isMobile ? '100%' : 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {navItems.map((item, i) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          aria-label={item.name}
                          className={isMobile ? 'w-full' : ''}
                          onClick={() => setIsExpanded(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.8, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: i * 0.05, type: 'spring' }}
                            className={cn(
                              'flex items-center justify-center h-12 rounded-xl z-50',
                              isMobile ? 'w-full px-4 py-2 mb-1 bg-white/10 text-white text-base font-medium' : 'h-10 px-3 rounded-full',
                              'transition-all duration-300 hover:scale-105',
                              pathname === item.path
                                ? 'bg-white/20 text-white shadow-md'
                                : 'text-white/80 hover:bg-white/10'
                            )}
                          >
                            {item.icon}
                            <span className={cn(
                              isMobile ? 'ml-3 text-base font-semibold' : 'ml-2 text-sm font-medium whitespace-nowrap',
                              pathname === item.path ? 'text-white' : 'text-white/80'
                            )}>
                              {item.name}
                            </span>
                          </motion.div>
                        </Link>
                      ))}
                      {/* Theme Toggle */}
                      <motion.button
                        initial={{ scale: 0.8, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: navItems.length * 0.05, type: 'spring' }}
                        onClick={toggleTheme}
                        className={cn(
                          isMobile ? 'w-full flex items-center justify-center h-12 rounded-xl bg-white/10 text-white text-base font-medium' : 'flex items-center justify-center h-10 w-10 rounded-full bg-white/20 text-white',
                          'hover:bg-white/30 transition-all duration-300 hover:scale-105',
                          'z-50'
                        )}
                        aria-label="Toggle theme"
                      >
                        {theme === 'dark' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                        {isMobile && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {/* Cross button just below dock on mobile when expanded */}
              {isMobile && isExpanded && (
                <button
                  className="mt-2 mb-2 w-12 h-12 rounded-full bg-white/80 text-purple-700 flex items-center justify-center shadow-lg z-50"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close navigation"
                  style={{ position: 'relative' }}
                >
                  <X className="h-7 w-7" />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 