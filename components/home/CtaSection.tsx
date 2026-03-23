import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ocean))]/90 to-[hsl(var(--ocean))]/70" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">Ready for Your Island Adventure?</h2>
          <p className="text-xl text-white/80 mb-10">
            Let us craft the perfect PEI experience tailored just for you. From coastal explorations to culinary
            journeys, your adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="inline-flex items-center justify-center rounded-md bg-white text-[hsl(var(--ocean))] hover:bg-white/90 px-10 py-4 text-lg">
              Explore Packages
            </Link>
            <Link href="/booking" className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg">
              Book Your Trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
