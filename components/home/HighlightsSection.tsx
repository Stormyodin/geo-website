"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioFeedback";

const highlights = [
  {
    title: "Pristine Beaches",
    description: "Over 800km of stunning coastline with iconic red sand beaches",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      </svg>
    )
  },
  {
    title: "Scenic Landscapes",
    description: "Rolling green hills, red cliffs, and picturesque lighthouses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  },
  {
    title: "Culinary Delights",
    description: "World-famous lobster, oysters, and farm-to-table cuisine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    )
  },
  {
    title: "Perfect Climate",
    description: "Warm summers ideal for beach activities and exploration",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }
];

export default function HighlightsSection() {
  const { play } = useAudio();

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } 
    }
  };

  return (
    <section className="py-20 bg-[hsl(var(--card))] border-y border-[hsl(var(--border))] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {highlights.map((item) => (
            <motion.div 
              key={item.title} 
              variants={itemVariants}
              onMouseEnter={() => play("hover")}
              onClick={() => play("click")}
              whileHover={{ y: -8 }}
              className="text-center group p-8 rounded-3xl hover:bg-[hsl(var(--secondary))]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--ocean))]/10 mx-auto mb-6 flex items-center justify-center text-[hsl(var(--ocean))] group-hover:bg-[hsl(var(--ocean))] group-hover:text-white transition-all duration-500 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-bold text-[hsl(var(--foreground))] mb-3 tracking-tight">{item.title}</h3>
              <p className="text-[0.9rem] leading-relaxed text-[hsl(var(--muted-foreground))]">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
