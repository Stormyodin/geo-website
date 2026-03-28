import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { AudioProvider } from "../components/AudioFeedback";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Coast & Cove Adventures | Discover Prince Edward Island",
  description: "Experience the magic of PEI with curated coastal adventures, cultural journeys, and premium island tours."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AudioProvider>
            <Navbar />
            {children}
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
