"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TourPackage = {
  id: string;
  title: string;
  price: number;
  duration: string;
  max_guests?: number;
  image_url: string;
  description: string;
};

const packagesSeed: TourPackage[] = [
  {
    id: "sandstone-sunset",
    title: "Sandstone Sunset Sojourn",
    price: 299,
    duration: "3 Days",
    max_guests: 10,
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    description: "Golden-hour cliff viewpoints and coastal trails."
  },
  {
    id: "anne-heritage",
    title: "Anne & Heritage Trail",
    price: 189,
    duration: "2 Days",
    max_guests: 12,
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    description: "Literary landmarks and heritage walks."
  },
  {
    id: "red-sand-retreat",
    title: "Red Sand Retreat",
    price: 349,
    duration: "4 Days",
    max_guests: 8,
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    description: "Relaxing coastal itinerary with flexible pacing."
  }
];

export default function BookingPage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packagesSeed[0].id);
  const [travelDate, setTravelDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);

  const selectedPackage = useMemo(
    () => packagesSeed.find((p) => p.id === selectedPackageId) || packagesSeed[0],
    [selectedPackageId]
  );
  const totalPrice = selectedPackage.price * guests;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageIdFromUrl = params.get("packageId");
    if (!packageIdFromUrl) return;
    const exists = packagesSeed.some((p) => p.id === packageIdFromUrl);
    if (exists) setSelectedPackageId(packageIdFromUrl);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !travelDate) return;
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-green-700 text-3xl">✓</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thanks for choosing <span className="font-medium text-foreground">{selectedPackage.title}</span>. We&apos;ve received your request.
            </p>
            <div className="p-6 mb-8 text-left rounded-xl border border-border bg-card">
              <h2 className="font-semibold text-foreground mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-base">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-[hsl(var(--ocean))]">${totalPrice} CAD</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3">
                Return Home
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--ocean))] hover:bg-[hsl(var(--ocean-light))] text-white px-6 py-3"
              >
                Explore More Adventures
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(var(--ocean))] mb-4">
            ← Back to Adventures
          </Link>
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">Book Your Adventure</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete your booking in a few steps. This route is wired and ready for backend integration.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-6">
              <section className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-lg font-semibold mb-4">1. Select Your Adventure</h2>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full h-12 rounded-md border border-border px-3 bg-background"
                >
                  {packagesSeed.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} - ${pkg.price} CAD
                    </option>
                  ))}
                </select>
                <div className="mt-4 p-4 bg-secondary rounded-lg flex gap-4 items-start">
                  <img src={selectedPackage.image_url} alt={selectedPackage.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold">{selectedPackage.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedPackage.duration}
                      {selectedPackage.max_guests ? ` · Max ${selectedPackage.max_guests}` : ""}
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-lg font-semibold mb-4">2. Travel Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-2">Travel Date *</label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full h-12 rounded-md border border-border px-3 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Guests *</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full h-12 rounded-md border border-border px-3 bg-background"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-lg font-semibold mb-4">3. Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm block mb-2">Full Name *</label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-12 rounded-md border border-border px-3 bg-background"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm block mb-2">Email *</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full h-12 rounded-md border border-border px-3 bg-background"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm block mb-2">Phone</label>
                      <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full h-12 rounded-md border border-border px-3 bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Special Requests</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full min-h-[100px] rounded-md border border-border px-3 py-2 bg-background"
                    />
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full h-14 text-lg rounded-md bg-[hsl(var(--ocean))] hover:bg-[hsl(var(--ocean-light))] text-white"
              >
                Complete Booking - ${totalPrice} CAD
              </button>
            </form>
          </div>

          <aside className="lg:col-span-1">
            <div className="p-6 rounded-xl border border-border bg-card sticky top-28">
              <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium text-right">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price / person:</span>
                  <span>${selectedPackage.price} CAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span>{guests}</span>
                </div>
                {travelDate ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{travelDate}</span>
                  </div>
                ) : null}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-[hsl(var(--ocean))]">${totalPrice} CAD</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                <p>• Secure booking flow</p>
                <p>• Free cancellation up to 48h</p>
                <p>• Instant confirmation screen</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
