"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TourPackage = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: "adventure" | "cultural" | "culinary" | "relaxation" | "family";
  image_url: string;
  max_guests?: number;
  is_featured?: boolean;
};

const categories: { value: TourPackage["category"] | "all"; label: string }[] = [
  { value: "all", label: "All Adventures" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "culinary", label: "Culinary" },
  { value: "relaxation", label: "Relaxation" },
  { value: "family", label: "Family" }
];

const packagesSeed: TourPackage[] = [
  // ... same data
  {
    id: "sandstone-sunset",
    title: "Sandstone Sunset Sojourn",
    description: "Golden-hour cliff viewpoints, coastal trails, and a curated PEI photo walk.",
    duration: "3 Days",
    price: 299,
    category: "adventure",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    max_guests: 10,
    is_featured: true
  },
  {
    id: "anne-heritage",
    title: "Anne & Heritage Trail",
    description: "Walk literary landmarks, heritage sites, and gardens that inspired Anne's world.",
    duration: "2 Days",
    price: 189,
    category: "cultural",
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    max_guests: 12
  },
  {
    id: "lobster-local",
    title: "Lobster & Local Bites",
    description: "Taste PEI's signature flavors with a guided day of seafood and local producers.",
    duration: "1 Day",
    price: 149,
    category: "culinary",
    image_url: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800"
  },
  {
    id: "red-sand-retreat",
    title: "Red Sand Retreat",
    description: "Slow coastal drives, beach downtime, and scenic moments with flexible pacing.",
    duration: "4 Days",
    price: 349,
    category: "relaxation",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
  },
  {
    id: "family-island",
    title: "Family Island Escape",
    description: "Kid-friendly itinerary with top attractions, beach play, and simple logistics.",
    duration: "3 Days",
    price: 279,
    category: "family",
    image_url: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800",
    max_guests: 8
  }
];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]["value"]>("all");
  const filteredPackages = useMemo(
    () => (selectedCategory === "all" ? packagesSeed : packagesSeed.filter((p) => p.category === selectedCategory)),
    [selectedCategory]
  );

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-20 bg-[hsl(var(--ocean))] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920')] bg-cover bg-center" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 text-sm uppercase tracking-[0.2em] mb-4 block"
          >
            Explore Our
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
          >
            Island Adventures
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            className="h-1 bg-white/50 mx-auto mb-6" 
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/80"
          >
            Curated experiences that capture the essence of Prince Edward Island.
          </motion.p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-[hsl(var(--border))] sticky top-16 z-30">
        <div className="container mx-auto px-4 flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-md text-sm border transition-all duration-300 ${
                selectedCategory === cat.value
                  ? "bg-[hsl(var(--ocean))] text-white border-[hsl(var(--ocean))] shadow-lg scale-105"
                  : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--ocean))] hover:border-[hsl(var(--ocean))]"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[hsl(var(--muted-foreground))]">
              Showing <span className="text-[hsl(var(--foreground))] font-medium">{filteredPackages.length}</span> adventures
            </p>
            <Link href="/" className="text-[hsl(var(--ocean))] underline text-sm hover:text-[hsl(var(--ocean-light))] transition-colors">
              Back to Home
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg) => (
                <motion.article 
                  key={pkg.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="group overflow-hidden border border-[hsl(var(--border))] rounded-2xl bg-[hsl(var(--card))] shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={pkg.image_url} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-xs uppercase">{pkg.category}</div>
                    {pkg.is_featured && (
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs">Featured</div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg px-4 py-2 shadow-lg">
                      <span className="text-2xl font-semibold text-[hsl(var(--ocean))]">${pkg.price}</span>
                      <span className="text-sm text-[hsl(var(--muted-foreground))] ml-1">CAD</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">{pkg.title}</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex items-center justify-between text-sm text-[hsl(var(--muted-foreground))] mb-5">
                      <span>{pkg.duration}</span>
                      {pkg.max_guests ? <span>Up to {pkg.max_guests}</span> : <span>&nbsp;</span>}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/booking?packageId=${encodeURIComponent(pkg.id)}`}
                        className="flex-1 inline-flex justify-center items-center rounded-md bg-[hsl(var(--ocean))] hover:bg-[hsl(var(--ocean-light))] text-white px-4 py-2 text-sm transition-all duration-300 active:scale-95"
                      >
                        Book
                      </Link>
                      <Link
                        href="/discover-pei"
                        className="inline-flex justify-center items-center rounded-md border border-[hsl(var(--border))] hover:border-[hsl(var(--ocean))] text-sm px-4 py-2 transition-all duration-300"
                      >
                        Learn
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
