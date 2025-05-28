'use client';

import { useDevice } from '@/components/device-provider';
import DesktopAboutPage from './DesktopAboutPage';
import MobileAboutPage from './MobileAboutPage';
import { useTheme } from 'next-themes';
import styles from './about.module.css';

export default function AboutPage() {
  const { isMobile, isClient } = useDevice();
  const { theme } = useTheme();

  if (!isClient) {
    return <div className="min-h-screen bg-background"></div>;
  }
  
  // Apply the appropriate CSS class based on theme
  const containerClass = `${styles.aboutPageContainer} ${theme === 'dark' ? styles.dark : ''}`;

  return (
    <div className={containerClass}>
      {isMobile ? <MobileAboutPage /> : <DesktopAboutPage />}
    </div>
  );
}
