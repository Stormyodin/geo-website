import Link from "next/link";

const anneHighlights = [
  "Visit Green Gables Heritage Place",
  "Explore the Haunted Wood trail",
  "Tour Montgomery's birthplace",
  "Experience Anne-themed attractions"
];

export default function InfoSection() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-[hsl(var(--coral))] text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Welcome to PEI</span>
          <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--foreground))] mb-6">Canada&apos;s Birthplace Awaits</h2>
          <div className="w-16 h-1 bg-[hsl(var(--ocean))] mb-8" />
          <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
            Prince Edward Island, affectionately known as &quot;The Gentle Island,&quot; is a place where time slows down and
            every moment becomes a memory. With its signature red cliffs, endless sandy beaches, and warm Island
            hospitality, PEI offers an escape from the ordinary.
          </p>
          <Link href="/discover-pei" className="inline-flex rounded-md bg-[hsl(var(--ocean))] text-white hover:bg-[hsl(var(--ocean-light))] px-8 py-3">
            Learn More About PEI
          </Link>
        </div>
      </section>

      <section className="py-20 bg-[hsl(var(--secondary))]/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-[hsl(var(--coral))] text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Literary Heritage</span>
          <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--foreground))] mb-6">Home of Anne of Green Gables</h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
            Step into the world of Lucy Maud Montgomery&apos;s beloved character. The rolling farmland of Cavendish inspired
            the setting for one of the world&apos;s most cherished novels.
          </p>
          <ul className="space-y-3">
            {anneHighlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--coral))] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
