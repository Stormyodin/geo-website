"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "landforms" | "attractions" | "climate" | "food";

const landforms = [
  {
    title: "Red Sandstone Cliffs",
    description: "Iron-rich cliffs shaped by coastal erosion into dramatic formations along the shoreline.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  },
  {
    title: "Sandy Beaches",
    description: "Over 800 km of coastline with warm summer water and iconic red-sand stretches.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
  }
];

const attractions = [
  {
    title: "Green Gables Heritage Place",
    location: "Cavendish",
    description: "A literary landmark tied to Anne of Green Gables and one of PEI's most visited sites.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600"
  },
  {
    title: "Confederation Bridge",
    location: "Borden-Carleton",
    description: "A 12.9 km engineering landmark connecting PEI to mainland Canada.",
    image: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=600"
  }
];

const climate = [
  { season: "Spring", months: "April - May", summary: "Quiet beaches, blooms, and fewer crowds." },
  { season: "Summer", months: "June - August", summary: "Warm waters, festivals, and peak travel season." },
  { season: "Fall", months: "September - October", summary: "Foliage, harvest experiences, and mild weather." },
  { season: "Winter", months: "November - March", summary: "Snowy landscapes and a peaceful local rhythm." }
];

const food = [
  { title: "Lobster", desc: "Iconic PEI seafood tradition and community suppers." },
  { title: "Malpeque Oysters", desc: "Famous sweet-briny oysters harvested from island bays." },
  { title: "PEI Potatoes", desc: "Rich red-soil farming and signature island produce." },
  { title: "Ceilidhs", desc: "Traditional music gatherings with storytelling and dance." }
];

export default function DiscoverPeiPage() {
  const [active, setActive] = useState<Tab>("landforms");

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-4 block">Welcome to</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">Prince Edward Island</h1>
          <div className="w-16 h-1 bg-[hsl(var(--coral))] mx-auto mb-6" />
          <p className="text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
            Canada's smallest province with the biggest heart. Discover red sand beaches, rolling hills, and maritime hospitality.
          </p>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border -mt-12 relative z-20 mx-4 lg:mx-auto max-w-6xl rounded-2xl shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,660", label: "Square KM" },
              { value: "170,000", label: "Population" },
              { value: "1873", label: "Joined Canada" },
              { value: "#1", label: "Beaches in Canada" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-light text-[hsl(var(--ocean))]">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-secondary h-auto p-2 flex-wrap justify-center gap-2 rounded-xl border border-border inline-flex">
              {[
                { key: "landforms", label: "Landforms" },
                { key: "attractions", label: "Attractions" },
                { key: "climate", label: "Climate" },
                { key: "food", label: "Food & Culture" }
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key as Tab)}
                  className={`px-6 py-3 rounded-md text-sm transition-colors ${
                    active === t.key
                      ? "bg-[hsl(var(--ocean))] text-white"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--ocean))]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {active === "landforms" && (
            <div className="grid md:grid-cols-2 gap-8">
              {landforms.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative h-64">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{item.title}</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {active === "attractions" && (
            <div className="grid md:grid-cols-2 gap-8">
              {attractions.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <p className="text-sm text-[hsl(var(--coral))] mb-2">{item.location}</p>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {active === "climate" && (
            <div className="grid md:grid-cols-2 gap-6">
              {climate.map((s) => (
                <article key={s.season} className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-2xl font-light mb-1">{s.season}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{s.months}</p>
                  <p className="text-muted-foreground">{s.summary}</p>
                </article>
              ))}
            </div>
          )}

          {active === "food" && (
            <div className="grid md:grid-cols-2 gap-6">
              {food.map((f) => (
                <article key={f.title} className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                  <p className="text-muted-foreground">{f.desc}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-[hsl(var(--ocean))]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Ready to Experience PEI?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Browse curated adventures or start your booking to plan your island getaway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="bg-white text-[hsl(var(--ocean))] hover:bg-white/90 px-10 py-3 rounded-md">
              Explore Adventures
            </Link>
            <Link href="/booking" className="border border-white text-white hover:bg-white/10 px-10 py-3 rounded-md">
              Book Your Trip
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
