import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { DeviceProvider } from "@/components/device-provider";
import { FloatingDock } from "@/components/floating-dock";
import { GlobalTracingScrollbar } from "@/components/ui/tracing-beam";
import Footer from "@/components/footer";
import personalData from "@/data/personal.json";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Add display swap
  preload: true, // Ensure preloading
});

export const metadata: Metadata = {
  title: `${personalData.name} - ${personalData.title}`,
  description: personalData.bio,
  keywords: ["Developer", "Portfolio", ...personalData.interests],
  openGraph: {
    title: `${personalData.name} - ${personalData.title}`,
    description: personalData.bio,
    type: 'website',
    siteName: `${personalData.name}'s Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalData.name} - ${personalData.title}`,
    description: personalData.bio,
  },
  metadataBase: new URL('https://your-domain.com'), // Update with your actual domain
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica:ital@1&display=swap"
          as="style"
        />
        <style>
          {`
            .im-fell-text {
              font-family: 'IM Fell DW Pica', serif;
              font-style: italic;
            }
            .my-name {
              font-weight: bold;
              letter-spacing: -0.05em; /* Example, get the exact value */
              font-size: 2.25rem; /* text-4xl */
            }

            @media (min-width: 768px) { /* md: */
              .my-name {
                font-size: 4.5rem; /* md:text-7xl */
              }
            }

            .my-name-gradient {
              color: transparent;
              background-clip: text;
              -webkit-background-clip: text;
              background-image: linear-gradient(to right, indigo, purple, pink); /* Extracted value */
            }

            .dark .my-name-gradient {
              background-image: linear-gradient(to right, #FF512F, #DD2476, #8E2DE2); /* Dark mode gradient */
            }
          }
          `}
        </style>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <DeviceProvider>
              <GlobalTracingScrollbar />
              {children}
              <FloatingDock />
              <Footer />
            </DeviceProvider>
          </ThemeProvider>
        </body>
      </head>
    </html>
  );
}
