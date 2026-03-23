import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-40 right-20 w-48 h-48 bg-[hsl(var(--coral))]/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="text-white/90 text-lg tracking-[0.3em] uppercase font-light mb-4">Est. 2024</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-tight">Coast & Cove</h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white/90 mb-6 tracking-wide">Adventures</h2>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-8" />
        <p className="text-xl md:text-2xl text-white/85 font-light italic mb-12 tracking-wide">"Our Island, Your Playground"</p>
        <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Discover the magic of Prince Edward Island - where red sandstone cliffs meet endless beaches, and every sunset
          tells a story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/packages"
            className="inline-flex items-center rounded-md bg-white text-[hsl(var(--ocean))] hover:bg-white/90 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Explore Adventures
          </Link>
          <Link
            href="/discover-pei"
            className="inline-flex items-center rounded-md border-2 border-white/50 text-white hover:bg-white/10 px-10 py-4 text-lg font-light tracking-wide"
          >
            Discover PEI
          </Link>
        </div>
      </div>
    </section>
  );
}
