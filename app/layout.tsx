import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalTracingScrollbar } from '@/components/ui/tracing-beam';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Add display swap
  preload: true, // Ensure preloading
});

export const metadata: Metadata = {
  title: 'Archit Mishra - Portfolio',
  description:
    'Developer Portfolio showcasing projects and skills with languages like Python, C/C++ and JavaScript.',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
            <GlobalTracingScrollbar />
            {children}
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
