'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type DeviceContextType = {
  isMobile: boolean;
  isClient: boolean;
};

const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isClient: false,
});

export const useDevice = () => useContext(DeviceContext);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're client-side to avoid hydration mismatch
    setIsClient(true);

    // Set initial device type
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Set up listener for resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <DeviceContext.Provider value={{ isMobile, isClient }}>
      {children}
    </DeviceContext.Provider>
  );
} 