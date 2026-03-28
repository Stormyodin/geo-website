"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioFeedback";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { play, isMuted, toggleMute } = useAudio();
  const { theme, toggleTheme } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkHover = (id: string) => {
    setHoveredLink(id);
    play("hover");
  };

  const handleLinkClick = () => {
    play("click");
  };

  const handleToggleTheme = () => {
    toggleTheme();
    play("toggle");
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      style={{ 
        position: "fixed", 
        top: 0, 
        width: "100%", 
        zIndex: 100, 
        padding: isScrolled ? "1rem 2.5rem" : "1.5rem 2.5rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        backgroundColor: isScrolled ? "rgba(var(--background), 0.7)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
      }}
    >
      <Link 
        href="/" 
        onClick={handleLinkClick}
        onMouseEnter={() => handleLinkHover("logo")}
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <div style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "hsl(var(--primary))" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
        </div>
        <span style={{ 
          color: "white", 
          fontSize: "1.25rem", 
          fontWeight: 800, 
          letterSpacing: "-0.02em",
          textShadow: isScrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)" 
        }}>
          Coast &amp; Cove
        </span>
      </Link>
      
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          padding: "0.35rem", 
          borderRadius: "99px",
          backgroundColor: isScrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {[
            { label: "Home", href: "/" },
            { label: "Discover", href: "/discover-pei" },
            { label: "Adventures", href: "/packages" }
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              onMouseEnter={() => handleLinkHover(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ 
                color: "white", 
                textDecoration: "none", 
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "99px",
                position: "relative",
                transition: "all 0.2s"
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
              {hoveredLink === link.label && (
                <motion.div 
                  layoutId="nav_pill"
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    borderRadius: "99px", 
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)" 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <motion.button
            onClick={handleToggleTheme}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "light" ? "☀️" : "🌙"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={toggleMute}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
