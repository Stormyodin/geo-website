"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioFeedback";

export default function InfoSection() {
  const { play } = useAudio();

  return (
    <section style={{ 
      padding: "10rem 2rem", 
      backgroundColor: "hsl(var(--background))",
      overflow: "hidden"
    }}>
      <div style={{ maxWidth: "78rem", margin: "0 auto" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "6rem",
          alignItems: "center"
        }}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <motion.span 
              style={{ 
                color: "hsl(var(--accent))", 
                fontWeight: 700, 
                fontSize: "0.85rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.3em",
                display: "block",
                marginBottom: "1.5rem"
              }}
            >
              Our Vision
            </motion.span>
            <h2 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              marginBottom: "2rem",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em"
            }}>
              Crafting Unforgettable <br />
              <span style={{ color: "hsl(var(--primary))" }}>Island Memories</span>
            </h2>
            <p style={{ 
              fontSize: "1.15rem", 
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.8,
              marginBottom: "2.5rem"
            }}>
              Since 2024, Coast & Cove has been dedicated to showcasing the authentic beauty of PEI. We believe in high-concept adventures that respect the island's natural rhythm while providing unparalleled service and luxury.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div onMouseEnter={() => play("hover")}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Authenticity</h4>
                <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-foreground))" }}>Real stories, real people, and real island life shared with every traveler.</p>
              </div>
              <div onMouseEnter={() => play("hover")}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Sustainability</h4>
                <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-foreground))" }}>Protecting the red sandstone cliffs and pristine beaches for generations.</p>
              </div>
            </div>
          </motion.div>

          {/* Imagery Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            <div style={{ 
              aspectRatio: "1", 
              borderRadius: "2rem", 
              overflow: "hidden",
              boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15)",
              border: "1px solid hsl(var(--border))"
            }}>
              <img 
                src="/images/rolling_hills.jpg" 
                alt="PEI Rolling Hills" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            {/* Floating Detail Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                position: "absolute",
                bottom: "-2rem",
                left: "-2rem",
                background: "rgba(var(--background), 0.8)",
                backdropFilter: "blur(20px)",
                padding: "2rem",
                borderRadius: "1.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                maxWidth: "18rem"
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  📍
                </div>
                <h5 style={{ fontWeight: 700, margin: 0 }}>Local Expertise</h5>
              </div>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", margin: 0 }}>
                Our guides are 100% island-born, ensuring you find the hidden paths and quiet coves.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
