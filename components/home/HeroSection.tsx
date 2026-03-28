"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAudio } from "@/components/AudioFeedback";

export default function HeroSection() {
  const { play } = useAudio();

  return (
    <section style={{ 
      position: "relative", 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "hsl(var(--background))"
    }}>
      {/* Background Media */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        style={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 0,
          backgroundImage: "url('/images/pei_roadtrip.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, hsl(var(--background)) 100%)" 
        }} />
      </motion.div>

      {/* Floating Elements for Depth */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div style={{ 
        textAlign: "center", 
        maxWidth: "64rem", 
        padding: "0 2rem",
        zIndex: 10,
        position: "relative"
      }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            color: "hsl(var(--accent))", 
            fontWeight: 800, 
            fontSize: "0.85rem", 
            textTransform: "uppercase", 
            letterSpacing: "0.4em",
            display: "block",
            marginBottom: "1.5rem"
          }}
        >
          Discover the Gentle Island
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ 
            fontSize: "clamp(3.5rem, 12vw, 7rem)", 
            color: "white", 
            fontWeight: 900,
            lineHeight: 0.9,
            marginBottom: "2rem",
            letterSpacing: "-0.05em"
          }}
        >
          Coast <span style={{ color: "hsl(var(--primary))" }}>&</span> Cove
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ 
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)", 
            color: "rgba(255,255,255,0.85)", 
            maxWidth: "38rem", 
            margin: "0 auto 3rem",
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Unforgettable adventures across Prince Edward Island. Experience red cliffs, rolling hills, and world-class culinary treats.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/discover-pei"
            onMouseEnter={() => play("hover")}
            onClick={() => play("click")}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px hsla(var(--primary), 0.5)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "hsl(var(--primary))",
                color: "white",
                padding: "1.1rem 2.8rem",
                borderRadius: "99px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 10px 25px -5px hsla(var(--primary), 0.3)",
                transition: "box-shadow 0.3s ease"
              }}
            >
              Start Exploring
            </motion.button>
          </Link>
          <Link href="/packages"
            onMouseEnter={() => play("hover")}
            onClick={() => play("click")}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                padding: "1.1rem 2.8rem",
                borderRadius: "99px",
                border: "1px solid rgba(255,255,255,0.25)",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                transition: "background-color 0.3s ease"
              }}
            >
              Curated Adventures
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ 
          position: "absolute", 
          bottom: "3rem", 
          left: "50%", 
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          color: "white",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          opacity: 0.6
        }}
      >
        <span style={{ fontSize: "0.65rem", fontWeight: 700 }}>Discover More</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            width: "1px", 
            height: "50px", 
            background: "linear-gradient(to bottom, white, transparent)" 
          }}
        />
      </motion.div>
    </section>
  );
}
