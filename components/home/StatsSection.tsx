"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioFeedback";

const stats = [
  { value: "1,100", suffix: "km", label: "Pristine Coastline", icon: "🌊" },
  { value: "40", suffix: "+", label: "Historic Lighthouses", icon: "🗼" },
  { value: "250", suffix: "+", label: "Active Watersheds", icon: "💧" },
  { value: "95", suffix: "%", label: "Guest Satisfaction", icon: "✨" }
];

export default function StatsSection() {
  const { play } = useAudio();

  return (
    <section style={{ 
      padding: "8rem 2rem", 
      backgroundColor: "hsl(var(--secondary))",
      position: "relative",
      overflow: "hidden" 
    }}>
      {/* Decorative Orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "40rem", height: "40rem", background: "hsl(var(--primary)/0.05)", borderRadius: "50%", filter: "blur(100px)" }} />
      
      <div style={{ maxWidth: "78rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "2.5rem" 
        }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => play("hover")}
              style={{
                backgroundColor: "hsl(var(--card))",
                padding: "3rem 2rem",
                borderRadius: "2rem",
                textAlign: "center",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "all 0.3s ease"
              }}
            >
              <span style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}>{stat.icon}</span>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                style={{ color: "hsl(var(--primary))", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}
              >
                {stat.value}<span style={{ fontSize: "1.5rem", opacity: 0.6 }}>{stat.suffix}</span>
              </motion.div>
              <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
