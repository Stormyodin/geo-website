const highlights = [
  {
    title: "Pristine Beaches",
    description: "Over 800km of stunning coastline with iconic red sand beaches"
  },
  {
    title: "Scenic Landscapes",
    description: "Rolling green hills, red cliffs, and picturesque lighthouses"
  },
  {
    title: "Culinary Delights",
    description: "World-famous lobster, oysters, and farm-to-table cuisine"
  },
  {
    title: "Perfect Climate",
    description: "Warm summers ideal for beach activities and exploration"
  }
];

export default function HighlightsSection() {
  return (
    <section className="py-16 bg-[hsl(var(--card))] border-y border-[hsl(var(--border))]">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item) => (
            <div key={item.title} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--ocean))]/10 mx-auto mb-4 group-hover:bg-[hsl(var(--ocean))] transition-colors" />
              <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
