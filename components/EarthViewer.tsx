"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioFeedback";

interface Location {
  name: string;
  lat: number;
  lng: number;
  altitude: number;
  heading: number;
  tilt: number;
  description: string;
  image: string;
}

const PEI_LOCATIONS: Location[] = [
  {
    name: "Charlottetown",
    lat: 46.2382,
    lng: -63.1257,
    altitude: 500,
    heading: 0,
    tilt: 45,
    description: "The historic capital of Prince Edward Island, known for its vibrant downtown and red-brick heritage buildings.",
    image: "/images/confederation_centre.jpg"
  },
  {
    name: "Cavendish & Red Cliffs",
    lat: 46.4833,
    lng: -63.3833,
    altitude: 300,
    heading: 320,
    tilt: 60,
    description: "Famous for the iconic red sandstone cliffs and the inspiration for Anne of Green Gables.",
    image: "/images/cavendish_cliffs.jpg"
  },
  {
    name: "Confederation Bridge",
    lat: 46.25,
    lng: -63.7,
    altitude: 800,
    heading: 260,
    tilt: 50,
    description: "The 12.9 km bridge connecting PEI to the mainland, an engineering marvel over the Abegweit Passage.",
    image: "/images/pei_roadtrip.jpg"
  },
  {
    name: "Greenwich Dunes",
    lat: 46.45,
    lng: -62.6,
    altitude: 400,
    heading: 0,
    tilt: 45,
    description: "Stunning parabolic dunes and a floating boardwalk in the PEI National Park.",
    image: "/images/dunes.jpg"
  },
  {
    name: "North Rustico",
    lat: 46.46,
    lng: -63.31,
    altitude: 350,
    heading: 45,
    tilt: 55,
    description: "A picturesque fishing village with a beautiful harbor and famous seafood restaurants.",
    image: "/images/river.jpg"
  }
];

export default function EarthViewer() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { play } = useAudio();

  useEffect(() => {
    // Set initial location
    setSelectedLocation(PEI_LOCATIONS[0]);
    
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (key && key !== "your_key_here") {
      setApiKey(key);
    }
    setLoading(false);
  }, []);

  const handleLocationSelect = (loc: Location) => {
    setSelectedLocation(loc);
    play("click");
  };

  if (loading) return <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>;

  return (
    <div style={{ padding: "4rem 0", background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 1rem" }}>
        
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: "hsl(var(--ocean))", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}
          >
            Interactive Exploration
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "2.5rem", fontWeight: 300, color: "hsl(var(--foreground))" }}
          >
            PEI Satellite & 3D
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ height: "3px", background: "hsl(var(--coral))", margin: "1rem auto" }}
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ color: "hsl(var(--muted-foreground))", maxWidth: "40rem", margin: "0 auto" }}
          >
            Explore the island from above. Select a location below to update the view, then launch the full 3D experience in Google Earth.
          </motion.p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 350px", 
          gap: "2rem", 
          height: "650px",
          background: "hsl(var(--card))",
          borderRadius: "1.5rem",
          padding: "1rem",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          overflow: "hidden"
        }}>
          
          {/* Map Viewport */}
          <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", background: "#0c0d12" }}>
            <div style={{ width: "100%", height: "100%" }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={apiKey 
                  ? `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${selectedLocation?.lat},${selectedLocation?.lng}&zoom=15&maptype=satellite`
                  : `https://maps.google.com/maps?q=${selectedLocation?.lat},${selectedLocation?.lng}&t=k&z=15&ie=UTF8&iwloc=&output=embed`
                }
              />
            </div>

            {/* Float Overlay for 3D Launcher */}
            <AnimatePresence mode="wait">
              {selectedLocation && (
                <motion.div
                  key={selectedLocation.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ 
                    position: "absolute", 
                    bottom: "2rem", 
                    left: "2rem", 
                    right: "2rem",
                    display: "flex", 
                    justifyContent: "center",
                    pointerEvents: "none"
                  }}
                >
                  <motion.a
                    href={`https://earth.google.com/web/@${selectedLocation.lat},${selectedLocation.lng},${selectedLocation.altitude}a,1000d,35y,0h,45t,0r`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => play("hover")}
                    style={{ 
                      padding: "1rem 2.5rem", 
                      background: "hsl(var(--ocean))", 
                      color: "white", 
                      borderRadius: "14px", 
                      textDecoration: "none",
                      fontWeight: 600,
                      boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                      pointerEvents: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "1rem"
                    }}
                  >
                    <span>🚀 Launch 3D Google Earth View</span>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.5rem 1rem", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: "2rem", fontSize: "0.75rem", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
              Satellite View Activated
            </div>
          </div>

          {/* Location Selection Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", paddingRight: "0.5rem" }} className="custom-scrollbar">
            {PEI_LOCATIONS.map((loc) => (
              <motion.button
                key={loc.name}
                onClick={() => handleLocationSelect(loc)}
                onMouseEnter={() => play("hover")}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: selectedLocation?.name === loc.name ? "hsl(var(--ocean))" : "rgba(255,255,255,0.03)",
                  border: "1px solid",
                  borderColor: selectedLocation?.name === loc.name ? "hsl(var(--ocean))" : "hsl(var(--border))",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ width: "60px", height: "60px", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0 }}>
                  <img src={loc.image} alt={loc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: selectedLocation?.name === loc.name ? "white" : "hsl(var(--foreground))" }}>{loc.name}</h4>
                  <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.75rem", color: selectedLocation?.name === loc.name ? "rgba(255,255,255,0.8)" : "hsl(var(--muted-foreground))", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {loc.description}
                  </p>
                </div>
              </motion.button>
            ))}

            <div style={{ marginTop: "auto", padding: "1.5rem", background: "rgba(255,152,0,0.05)", borderRadius: "1rem", border: "1px dashed rgba(255,152,0,0.3)" }}>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.5 }}>
                <span style={{ color: "#FF9800", fontWeight: 600 }}>Tip:</span> You can use your mouse to rotate and tilt the view once a location is loaded in 3D.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
}
