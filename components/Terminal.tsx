'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Standard ASCII art for larger screens
const fullAsciiArt = `
 █████╗ ██████╗  ██████╗██╗  ██╗██╗████████╗    ███╗   ███╗██╗███████╗██╗  ██╗██████╗  █████╗ 
██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝    ████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔══██╗
███████║██████╔╝██║     ███████║██║   ██║       ██╔████╔██║██║███████╗███████║██████╔╝███████║
██╔══██║██╔══██╗██║     ██╔══██║██║   ██║       ██║╚██╔╝██║██║╚════██║██╔══██║██╔══██╗██╔══██║
██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║       ██║ ╚═╝ ██║██║███████║██║  ██║██║  ██║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝       ╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

// Stacked ASCII art for mobile screens
const stackedAsciiArt = `
 █████╗ ██████╗  ██████╗██╗  ██╗██╗████████╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝
███████║██████╔╝██║     ███████║██║   ██║   
██╔══██║██╔══██╗██║     ██╔══██║██║   ██║   
██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   

███╗   ███╗██╗███████╗██╗  ██╗██████╗  █████╗ 
████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔══██╗
██╔████╔██║██║███████╗███████║██████╔╝███████║
██║╚██╔╝██║██║╚════██║██╔══██║██╔══██╗██╔══██║
██║ ╚═╝ ██║██║███████║██║  ██║██║  ██║██║  ██║
╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

// Very compact ASCII art for smallest screens
const compactAsciiArt = `
 █████╗ ██████╗  ██████╗██╗  ██╗██╗████████╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝
███████║██████╔╝██║     ███████║██║   ██║   
██╔══██║██╔══██╗██║     ██╔══██║██║   ██║   
██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   

██████╗   ███╗   ███╗██╗███████╗██╗  ██╗██████╗  █████╗ 
      ████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔══██╗
      ██╔████╔██║██║███████╗███████║██████╔╝███████║
      ██║╚██╔╝██║██║╚════██║██╔══██║██╔══██╗██╔══██║
      ██║ ╚═╝ ██║██║███████║██║  ██║██║  ██║██║  ██║
      ╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const commands = [
  { cmd: 'whoami', delay: 500 },
  { cmd: 'pwd', delay: 1000 },
];

export function Terminal() {
  const [typedCommand, setTypedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );

  // Function to determine which ASCII art to display based on screen width
  const getAsciiArt = () => {
    if (windowWidth < 325) {
      return compactAsciiArt;
    } else if (windowWidth < 768) {
      return stackedAsciiArt;
    } else {
      return fullAsciiArt;
    }
  };

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const sequence = async () => {
      // Type first command
      for (let i = 0; i <= commands[0].cmd.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setTypedCommand(commands[0].cmd.slice(0, i));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowOutput(true);

      // Show file listing after delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowFiles(true);
    };

    sequence();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="terminal-window"
    >
      {/* Terminal Title Bar */}
      <div className="terminal-titlebar">
        <div className="terminal-button close" />
        <div className="terminal-button minimize" />
        <div className="terminal-button maximize" />
        <div className="flex-1 text-center text-sm text-[rgb(var(--terminal-text))]">
          archit@portfolio ~
        </div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-text space-y-4 p-4 pt-14 overflow-x-auto">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[rgb(var(--terminal-text))] text-sm"
        >
          Welcome to the Portfolio Terminal v1.1.0
        </motion.div>
        {/* Command Input */}
        <div className="terminal-prompt text-base md:text-lg">
          <span>{typedCommand}</span>
          {typedCommand !== commands[0].cmd && (
            <span className="terminal-cursor" />
          )}
        </div>
        {/* ASCII Art Output - Added responsive ASCII art selection */}
        {showOutput && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[rgb(var(--terminal-accent))] whitespace-pre overflow-x-auto font-mono text-xs leading-tight mt-4 ascii-art"
          >
            {getAsciiArt()}
          </motion.pre>
        )}
        {/* Role Description */}
        {showOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[rgb(var(--terminal-prompt))] text-sm md:text-base font-semibold"
          >
            Full Stack Developer | Open Source Enthusiast
          </motion.div>
        )}
        {/* File Listing */}
        {showFiles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-2"
          >
            <div className="terminal-prompt text-base">pwd</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-[rgb(var(--terminal-text))]">
                <span> &nbsp;&nbsp;&nbsp;&nbsp;portfolio/archit</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

