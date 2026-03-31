"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAudio } from "@/components/AudioFeedback";
import ReviewSection from "@/components/ReviewSection";
import EarthViewer from "@/components/EarthViewer";

/* ═══════════════════════════════════════════════════
   DATA: Landforms
   ═══════════════════════════════════════════════════ */

const landforms = [
  {
    title: "Red Sandstone Cliffs",
    description: "Famous red cliffs made from iron-rich rock. Waves and wind have shaped them over many years. They are a beautiful sight against the blue ocean.",
    image: "/images/cavendish_cliffs.jpg"
  },
  {
    title: "Rolling Hills",
    description: "Beautiful green hills that are great for hiking and biking. The red soil here is perfect for growing potatoes.",
    image: "/images/rolling_hills.jpg"
  },
  {
    title: "Sandy Beaches and Coastline",
    description: "PEI has over 1,100 km of beaches. The water is warm in the summer, making it a great place to swim.",
    image: "/images/cavendish_beach.jpg"
  },
  {
    title: "Greenwich Coastal Dunes",
    description: "Special sand dunes that help protect the island. They are home to rare plants and birds.",
    image: "/images/dunes.jpg"
  },
  {
    title: "Island Forests",
    description: "Thick forests filled with native trees. They are protected areas where animals live and people can walk on trails.",
    image: "/images/forest.jpg"
  },
  {
    title: "Rivers and Estuaries",
    description: "PEI has many rivers that are great for fishing and kayaking. These areas are full of wildlife and birds.",
    image: "/images/river.jpg"
  }
];

/* ═══════════════════════════════════════════════════
   DATA: Attractions
   ═══════════════════════════════════════════════════ */

const attractions = [
  {
    title: "Green Gables Heritage Place",
    description: "A famous house that inspired the book 'Anne of Green Gables'. You can walk through the trails and see the historic farm.",
    image: "/images/green_gables.jpg"
  },
  {
    title: "PEI National Park",
    description: "A large park with red cliffs, beaches, and sand dunes. It's a great place for families to explore and have fun.",
    image: "/images/pei_roadtrip.jpg"
  },
  {
    title: "Confederation Trail",
    description: "A long path for walking and biking that goes across the whole island. It passes through beautiful farms and small towns.",
    image: "/images/confederation_trail.jpg"
  },
  {
    title: "Acadian Museum and Village",
    description: "A place to learn about the history of the Acadian people on PEI. You can see how they lived and learn about their music and food.",
    image: "/images/acadian_museum.jpg"
  },
  {
    title: "Cavendish Beach and Boardwalk",
    description: "A very popular beach with white sand and warm water. There are shops, restaurants, and fun games nearby.",
    image: "/images/cavendish.jpg"
  }
];

/* ═══════════════════════════════════════════════════
   DATA: Biodiversity (NEW SECTION)
   ═══════════════════════════════════════════════════ */

const biodiversity = [
  {
    title: "Red Fox",
    description: "A common animal on PEI with bright red fur. They live in forests and near the coast and are fun to see and photograph.",
    image: "/images/red_fox.jpg"
  },
  {
    title: "Bald Eagle",
    description: "Large, beautiful birds that fly near the ocean and rivers. They build nests in tall trees and catch fish in the water.",
    image: "/images/bald_eagle.jpg"
  },
  {
    title: "Harbor Seals",
    description: "Cute seals that often rest on the rocks and beaches. You can take boat tours to see them in the sun.",
    image: "/images/seal.jpg"
  },
  {
    title: "Whales",
    description: "Big whales like humpbacks swim in the water around PEI. You can go on a boat to watch them during the summer and fall.",
    image: "/images/whale.jpg"
  },
  {
    title: "Blue Spotted Salamander",
    description: "A rare little animal that lives on the forest floor. It is important to protect where they live so they stay healthy.",
    image: "/images/salamander.jpg"
  }
];

/* ═══════════════════════════════════════════════════
   DATA: Climate (detailed layout)
   ═══════════════════════════════════════════════════ */

const climateData = [
  {
    season: "Spring",
    months: "April to May",
    tempC: "5°C to 15°C",
    tempF: "41°F to 59°F",
    icon: "🌱",
    color: "#4CAF50",
    bgColor: "#f0f7f0",
    description: "Spring is when flowers start to bloom and birds return. It is a quiet time to visit with fewer people. Lobster season also begins in May.",
    tags: ["Lobster Season (May to June)", "Migrating Birds", "Quiet Beaches", "Lower Rates", "Wildflower Blooms"],
    activities: ["Birdwatching with spring migration bringing 300+ species", "Attending lobster suppers as season opens", "Beach walking without crowds", "Visiting farms during planting season", "Cycling the Confederation Trail", "Golf courses open with spring rates", "Photography of spring landscapes and blooms"],
    bestFor: "Budget travelers, bird enthusiasts, cyclists seeking solitude",
    weatherNotes: "Unpredictable with mix of sunny days and rain. Pack layers. Ocean still cold for swimming (8 to 12°C)."
  },
  {
    season: "Summer",
    months: "June to August",
    tempC: "18°C to 25°C",
    tempF: "64°F to 77°F",
    icon: "☀️",
    color: "#FF9800",
    bgColor: "#fff8e1",
    description: "Summer is the warmest time and the best for beaches. There are many festivals, outdoor music, and fun things to do in every town.",
    tags: ["Peak Season", "Warm Beaches", "Festivals", "Outdoor Dining", "Water Sports"],
    activities: ["Swimming at Cavendish and Brackley beaches", "Deep sea fishing charters for tuna and mackerel", "Attending PEI Festival of Lights", "Sea kayaking along the coast", "Visiting farmers markets across the island", "Stand up paddleboarding in calm bays", "Enjoying live music at outdoor venues"],
    bestFor: "Families, beach lovers, festival goers, water sports enthusiasts",
    weatherNotes: "Warmest months with occasional fog. UV can be strong even on cloudy days. Ocean swimmable from late June."
  },
  {
    season: "Autumn",
    months: "September to October",
    tempC: "8°C to 17°C",
    tempF: "46°F to 63°F",
    icon: "🍂",
    color: "#E65100",
    bgColor: "#fbe9e7",
    description: "Autumn is when the leaves turn bright red and gold. It is a great time for hiking and enjoying the harvest food from the farms.",
    tags: ["Fall Foliage", "Harvest Season", "Quiet Trails", "Cozy Evenings", "Fewer Crowds"],
    activities: ["Scenic drives through fall foliage routes", "Trail hiking through colorful forests", "Apple picking and farm visits", "Enjoying the PEI International Shellfish Festival", "Wine and cider tasting at local producers", "Exploring lighthouses without summer crowds", "Cozy dinners featuring seasonal harvest menus"],
    bestFor: "Hikers, photographers, food enthusiasts, couples seeking romance",
    weatherNotes: "Crisp and fresh with cool evenings. Rain possible but many clear beautiful days. First frost usually late October."
  },
  {
    season: "Winter",
    months: "November to March",
    tempC: "minus 10°C to 0°C",
    tempF: "14°F to 32°F",
    icon: "❄️",
    color: "#1565C0",
    bgColor: "#e3f2fd",
    description: "Winter brings lots of snow and is very peaceful. People enjoy skiing, snowmobiling, and ice fishing during these cold months.",
    tags: ["Snow Activities", "Indoor Culture", "Low Season", "Peaceful", "Snowmobiling"],
    activities: ["Snowmobiling on groomed island trails", "Cross country skiing through quiet forests", "Ice fishing on frozen rivers", "Visiting indoor heritage sites and museums", "Experiencing traditional winter community events", "Photography of frozen coastlines and harbors", "Enjoying cozy pub culture in Charlottetown"],
    bestFor: "Adventure seekers, culture enthusiasts, those seeking peaceful solitude",
    weatherNotes: "Cold with significant snowfall. Wind chill can be harsh near coast. Some roads may close during storms."
  }
];

/* ═══════════════════════════════════════════════════
   DATA: Food and Culture
   ═══════════════════════════════════════════════════ */

const food = [
  {
    title: "Fresh Lobster",
    description: "A very famous food in PEI. You can enjoy a fresh lobster meal with butter at many restaurants near the sea.",
    image: "/images/lobster.jpg"
  },
  {
    title: "Malpeque Oysters",
    description: "World-famous oysters picked from the clean bays of PEI. They are sweet and salty and a favorite for many visitors.",
    image: "/images/oysters.jpg"
  },
  {
    title: "PEI Potatoes",
    description: "PEI is famous for its potatoes grown in the rich red soil. They have a special taste and are used all across Canada.",
    image: "/images/potatoes.jpg"
  },
  {
    title: "Cultural Heritage and Ceilidhs",
    description: "The island's culture is a mix of many backgrounds. People gather for 'ceilidhs' to enjoy traditional music, dancing, and storytelling.",
    image: "/images/fiddle.jpg"
  }
];

/* ═══════════════════════════════════════════════════
   TABS and TYPES
   ═══════════════════════════════════════════════════ */

const TABS = ["landforms", "attractions", "biodiversity", "climate", "food"] as const;
type Tab = typeof TABS[number];

const TAB_LABELS: Record<Tab, string> = {
  landforms: "🏔️ Landforms",
  attractions: "🎯 Attractions",
  biodiversity: "🦊 Biodiversity",
  climate: "🌤️ Climate",
  food: "🍽️ Food and Culture"
};

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */

/* eslint-disable @typescript-eslint/no-explicit-any */
const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } }
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }
};

const expandWidth: any = {
  hidden: { width: 0 },
  visible: { width: "4rem", transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
};

const floatingAnimation: any = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */

export default function DiscoverPeiPage() {
  const [active, setActive] = useState<Tab>("landforms");
  const { play } = useAudio();
  const shouldReduceMotion = useReducedMotion();

  const handleTabClick = (tab: Tab) => {
    if (active !== tab) {
      setActive(tab);
      play("pop");
    }
  };

  return (
    <main style={{ minHeight: "100vh" }}>

      {/* Floating Background Orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, hsla(${200 + i * 30}, 70%, 60%, 0.06) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 12}%`
            }}
            animate={{
              x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 20 * (i % 2 === 0 ? -1 : 1), 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ══════ HERO SECTION ══════ */}
      <section style={{ position: "relative", paddingTop: "8rem", paddingBottom: "6rem", overflow: "hidden" }}>
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/pei_roadtrip.jpg')",
            backgroundSize: "cover", backgroundPosition: "center"
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.45), var(--background))" }} />
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "64rem", margin: "0 auto", padding: "0 1rem" }}>

          <motion.span variants={fadeUp} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "1rem" }}>
            Coast and Cove Adventures
          </motion.span>

          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, color: "white", marginBottom: "1.5rem" }}>
            Discover Prince Edward Island
          </motion.h1>

          <motion.div variants={expandWidth} style={{ height: "4px", background: "hsl(var(--coral))", margin: "0 auto 1.5rem", overflow: "hidden" }} />

          <motion.p variants={fadeUp} style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.8, maxWidth: "56rem", margin: "0 auto" }}>
            PEI is famous for its red soil and red cliffs. It produces more than 25% of Canada&apos;s potatoes. The island has beautiful hills, beaches, and forests. You can see many animals here, like red foxes and bald eagles. PEI also has a rich history from many different cultures, including Mi&apos;kmaq, Acadian, Scottish, and Irish.
          </motion.p>

          <motion.div variants={fadeUp} style={{ marginTop: "2rem" }}>
            <motion.a 
              href="#reviews"
              onMouseEnter={() => play("hover")}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
                play("click");
              }}
              style={{ 
                color: "rgba(255,255,255,0.6)", 
                fontSize: "0.85rem", 
                textDecoration: "none", 
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "2px",
                transition: "all 0.2s"
              }}
              whileHover={{ color: "white", borderColor: "white" }}
            >
              Read Visitor Reviews
            </motion.a>
          </motion.div>

          {/* Animated scroll down indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} style={{ marginTop: "3rem" }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: "1.5rem" }}>
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "3rem 1rem", background: "hsl(var(--card))", position: "relative", zIndex: 20, maxWidth: "78rem", margin: "-3rem auto 0", borderRadius: "1rem", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", border: "1px solid hsl(var(--border))" }}
      >
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", textAlign: "center", padding: "0 1rem" }}>
          {[
            { value: "Over 25%", label: "Of Canada's Potatoes" },
            { value: "1,100 km", label: "Pristine Coastline" },
            { value: "250+", label: "Watersheds" },
            { value: "High", label: "GDP and Export Growth" }
          ].map((stat) => (
            <motion.div key={stat.label} variants={scaleIn}>
              <motion.p style={{ fontSize: "1.75rem", fontWeight: 400, color: "hsl(var(--ocean))", margin: 0 }}
                whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                {stat.value}
              </motion.p>
              <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>


      {/* ══════ 3D EARTH SECTION (NEW) ══════ */}
      <EarthViewer />

      {/* ══════ TABS SECTION ══════ */}
      <section style={{ padding: "4rem 1rem 5rem", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

          {/* Tab Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.4rem", background: "hsl(var(--secondary))", padding: "0.5rem", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))" }}>
              {TABS.map((tab) => (
                <motion.button key={tab} type="button" 
                  onClick={() => handleTabClick(tab)}
                  onMouseEnter={() => play("hover")}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} 
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  style={{
                    padding: "0.65rem 1.25rem", borderRadius: "0.375rem", fontSize: "0.85rem",
                    border: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                    background: active === tab ? "hsl(var(--ocean))" : "transparent",
                    color: active === tab ? "white" : "hsl(var(--muted-foreground))",
                    fontWeight: active === tab ? 600 : 400
                  }}>
                  {TAB_LABELS[tab]}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>

              {active === "climate" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  {climateData.map((season, index) => (
                    <ClimateCard key={season.season} data={season} index={index} />
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                  {active === "landforms" && landforms.map((item, index) => <Card item={item} key={item.title} index={index} />)}
                  {active === "attractions" && attractions.map((item, index) => <Card item={item} key={item.title} index={index} />)}
                  {active === "biodiversity" && biodiversity.map((item, index) => <Card item={item} key={item.title} index={index} />)}
                  {active === "food" && food.map((item, index) => <Card item={item} key={item.title} index={index} />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════ REVIEWS SECTION ══════ */}
      <ReviewSection />

      {/* ══════ CTA SECTION ══════ */}
      <section style={{ padding: "5rem 1rem", background: "hsl(var(--ocean))", overflow: "hidden", position: "relative" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", top: "-200px", right: "-200px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ textAlign: "center", maxWidth: "42rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 300, color: "white", marginBottom: "1rem" }}>
            Ready to Experience PEI?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem", lineHeight: 1.7 }}>
            Browse curated adventures or start your booking to plan your island getaway with Coast and Cove Adventures.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <motion.div whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link 
                href="/packages" 
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
                style={{ display: "inline-block", background: "white", color: "hsl(var(--ocean))", padding: "0.75rem 2.5rem", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 500, boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}>
                Explore Adventures
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link 
                href="/booking" 
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
                style={{ display: "inline-block", border: "1px solid white", color: "white", padding: "0.75rem 2.5rem", borderRadius: "0.375rem", textDecoration: "none" }}>
                Book Your Trip
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   CLIMATE CARD COMPONENT (detailed season layout)
   ═══════════════════════════════════════════════════ */

function ClimateCard({ data, index }: { data: typeof climateData[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        whileHover={{ y: -4, boxShadow: "0 25px 60px rgba(0,0,0,0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ background: data.bgColor, borderRadius: "1.25rem", overflow: "hidden", border: "1px solid hsl(var(--border))", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr" }}>

          {/* Left sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ padding: "2rem", borderRight: "1px solid rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "1rem" }}>

            <motion.div {...floatingAnimation}
              style={{ width: "56px", height: "56px", borderRadius: "1rem", background: `linear-gradient(135deg, ${data.color}22, ${data.color}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
              {data.icon}
            </motion.div>

            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, color: "#1a1a2e" }}>{data.season}</h3>
              <p style={{ fontSize: "0.85rem", color: "#666", margin: "0.25rem 0 0 0" }}>{data.months}</p>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#444" }}>
              🌡️ <span>{data.tempC} ({data.tempF})</span>
            </motion.div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {data.tags.map((tag, i) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.06 }}
                  whileHover={{ scale: 1.08, backgroundColor: `${data.color}33` }}
                  style={{ fontSize: "0.7rem", padding: "0.3rem 0.6rem", borderRadius: "1rem", background: `${data.color}18`, color: data.color, fontWeight: 500, border: `1px solid ${data.color}30` }}>
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right content */}
          <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "#333", margin: 0 }}>
              {data.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.5 }}>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", margin: "0 0 0.75rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: data.color, fontSize: "0.75rem" }}>●</span> Recommended Activities
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 2rem" }}>
                {data.activities.map((activity, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.05 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "#555", lineHeight: 1.5 }}>
                    <span style={{ color: data.color, marginTop: "3px", fontSize: "0.5rem" }}>●</span>
                    {activity}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "auto" }}>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                style={{ background: "rgba(255,255,255,0.7)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", margin: "0 0 0.4rem 0", color: "#1a1a2e" }}>Best For:</p>
                <p style={{ fontSize: "0.82rem", color: "#555", margin: 0, lineHeight: 1.5 }}>{data.bestFor}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                style={{ background: "rgba(255,255,255,0.7)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", margin: "0 0 0.4rem 0", color: "#1a1a2e" }}>Weather Notes:</p>
                <p style={{ fontSize: "0.82rem", color: "#555", margin: 0, lineHeight: 1.5 }}>{data.weatherNotes}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   STANDARD CARD COMPONENT (Landforms, Attractions, Biodiversity, Food)
   ═══════════════════════════════════════════════════ */

function Card({ item, index }: { item: { title: string; description: string; image: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const { play } = useAudio();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <motion.article
        onMouseEnter={() => {
          setIsHovered(true);
          play("hover");
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => play("click")}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          flex: 1, borderRadius: "1rem", overflow: "hidden",
          border: "1px solid hsl(var(--border))", background: "hsl(var(--card))",
          boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.12)" : "0 8px 16px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s ease",
          cursor: "pointer"
        }}
      >
        <div style={{ position: "relative", height: "18rem", overflow: "hidden" }}>
          <motion.img src={item.image} alt={item.title} referrerPolicy="no-referrer"
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <motion.div animate={{ opacity: isHovered ? 1 : 0.8 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
          <motion.h2 animate={{ y: isHovered ? -5 : 0 }} transition={{ type: "spring", stiffness: 400 }}
            style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem", color: "white", fontSize: "1.25rem", fontWeight: 600, margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            {item.title}
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1 }}
          style={{ padding: "1.5rem" }}>
          <p style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7, margin: 0, fontSize: "0.95rem" }}>{item.description}</p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}
