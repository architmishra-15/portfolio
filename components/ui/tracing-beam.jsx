"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 900,
    damping: 100,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 900,
    damping: 100,
  });

  return (
    (<motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.2,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.1) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-netural-200 shadow-sm flex items-center justify-center">
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
            }}
            className="h-2 w-2  rounded-full border border-neutral-300 bg-white" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          // Set the SVG height
          height={svgHeight}
          className=" ml-4 block"
          aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              // set y1 for gradient
              y1={y1}
              // set y2 for gradient
              y2={y2}>
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>)
  );
};

export const GlobalTracingScrollbar = ({ 
    gradientColors = [
      { color: "#18CCFC", opacity: "0" },
      { color: "#18CCFC", opacity: "1" },
      { color: "#6344F5", offset: "0.325" },
      { color: "#AE48FF", opacity: "0" }
    ],
    thickness = 5, // Adjust thickness here
    className = 'container mx-auto px-4 py-8'
  }) => {
  const ref = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    
  });

  useEffect(() => {
    const updateHeight = () => {
        const totalHeight = document.documentElement.scrollHeight - 60; // Subtract navbar height
        setSvgHeight(totalHeight);
    
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 900,
    damping: 100,
  });

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 60]), {
    stiffness: 900,
    damping: 100,
  });


  return (
    <div 
      className={cn("fixed top-0 right-0 z-50 w-6 h-full pointer-events-none", className)}
      style={{
        backgroundColor: 'transparent',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none' // For Internet Explorer and Edge
      }}
    >
      <svg
        viewBox={`0 0 5 ${svgHeight}`}
        width="30"
        height="100%"
        className="absolute right-0 top-0"
        aria-hidden="true"
      >
        <motion.path
          d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.16"
          transition={{
            duration: 10,
          }}
        />
        <motion.path
          d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={thickness}
          className="motion-reduce:hidden"
          transition={{
            duration: 10,
          }}
        />
        <defs>
          <motion.linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={y1}
            y2={y2}
          >
            {gradientColors.map((stop, index) => (
              <stop 
                key={index} 
                stopColor={stop.color} 
                stopOpacity={stop.opacity || "1"}
                offset={stop.offset || (index / (gradientColors.length - 1)).toString()}
              />
            ))}
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};