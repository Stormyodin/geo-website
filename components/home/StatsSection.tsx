const stats = [
  { value: "800+", label: "KM of Coastline" },
  { value: "40+", label: "Lighthouses" },
  { value: "500+", label: "Happy Travelers" },
  { value: "4.9", label: "Average Rating" }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[hsl(var(--ocean))]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-4xl md:text-5xl font-light text-white block mb-2">{stat.value}</span>
              <p className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
