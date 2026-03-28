"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAudio } from "@/components/AudioFeedback";

export default function CtaSection() {
  const { play } = useAudio();

  return (
    <section style={{ 
      padding: "10rem 2rem", 
      backgroundColor: "hsl(var(--background))",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ maxWidth: "84rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, hsl(var(--ocean)) 0%, hsl(var(--primary)) 100%)",
            padding: "8rem 4rem",
            borderRadius: "3.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 40px 100px -20px hsla(var(--primary), 0.3)"
          }}
        >
          {/* Animated Background Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", top: "-20%", right: "-10%", width: "40rem", height: "40rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%" }}
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "30rem", height: "30rem", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "48% 52% 23% 77% / 61% 34% 66% 39%" }}
          />

          <div style={{ position: "relative", zIndex: 10 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)", 
                fontWeight: 900, 
                color: "white", 
                marginBottom: "2rem",
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}
            >
              Your Island Story <br />
              Starts Here.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                fontSize: "1.25rem", 
                color: "rgba(255,255,255,0.8)", 
                maxWidth: "32rem", 
                margin: "0 auto 3.5rem",
                lineHeight: 1.6
              }}
            >
              Don't just visit Prince Edward Island. Experience it through the eyes of those who love it most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/booking"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "white", color: "hsl(var(--primary))" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "1.25rem 3.5rem",
                    borderRadius: "99px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                  }}
                >
                  Book Your Escape
                </motion.button>
              </Link>
              <Link href="/packages"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "transparent",
                    color: "white",
                    padding: "1.25rem 3.5rem",
                    borderRadius: "1rem",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  View Packages
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
