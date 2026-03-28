"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const fadeInUp: any = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  if (bookingComplete) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-green-700 text-3xl">✓</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thanks for choosing <span className="font-medium text-foreground">{selectedPackage.title}</span>. We&apos;ve received your request.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 mb-8 text-left rounded-xl border border-border bg-card shadow-lg"
            >
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
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 hover:bg-secondary transition-colors">
                Return Home
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--ocean))] hover:bg-[hsl(var(--ocean-light))] text-white px-6 py-3 transition-colors shadow-lg shadow-ocean/20"
              >
                Explore More Adventures
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(var(--ocean))] mb-4 transition-colors">
            ← Back to Adventures
          </Link>
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">Book Your Adventure</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete your booking in a few steps. This route is wired and ready for backend integration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-6">
              <motion.section 
                {...fadeInUp}
                className="p-6 rounded-xl border border-border bg-card shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">1. Select Your Adventure</h2>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                >
                  {packagesSeed.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} - ${pkg.price} CAD
                    </option>
                  ))}
                </select>
                <motion.div 
                  layout
                  className="mt-4 p-4 bg-secondary rounded-lg flex gap-4 items-start"
                >
                  <motion.img 
                    layoutId="pkg-img"
                    src={selectedPackage.image_url} 
                    alt={selectedPackage.title} 
                    className="w-20 h-20 rounded-lg object-cover shadow-sm" 
                  />
                  <div>
                    <motion.h3 layoutId="pkg-title" className="font-semibold">{selectedPackage.title}</motion.h3>
                    <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
                    <p className="text-sm text-muted-foreground mt-1 text-[hsl(var(--ocean))] font-medium">
                      {selectedPackage.duration}
                      {selectedPackage.max_guests ? ` · Max ${selectedPackage.max_guests}` : ""}
                    </p>
                  </div>
                </motion.div>
              </motion.section>

              <motion.section 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl border border-border bg-card shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">2. Travel Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-2 font-medium">Travel Date *</label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-2 font-medium">Guests *</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </motion.section>

              <motion.section 
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl border border-border bg-card shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">3. Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm block mb-2 font-medium">Full Name *</label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm block mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        value={customerEmail}
                        placeholder="jane@example.com"
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm block mb-2 font-medium">Phone</label>
                      <input
                        value={customerPhone}
                        placeholder="+1 (902) 555-0123"
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full h-12 rounded-md border border-border px-3 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm block mb-2 font-medium">Special Requests</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Dietary requirements, accessibility needs, etc."
                      className="w-full min-h-[100px] rounded-md border border-border px-3 py-2 bg-background focus:ring-2 focus:ring-ocean/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </motion.section>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-14 text-lg font-medium rounded-md bg-[hsl(var(--ocean))] hover:bg-[hsl(var(--ocean-light))] text-white transition-all shadow-lg shadow-ocean/20"
              >
                Complete Booking - ${totalPrice} CAD
              </motion.button>
            </form>
          </div>

          <aside className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-xl border border-border bg-card sticky top-28 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium text-right text-[hsl(var(--ocean))]">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price / person:</span>
                  <span className="font-medium">${selectedPackage.price} CAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                {travelDate && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between"
                  >
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{travelDate}</span>
                  </motion.div>
                )}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg items-center">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold text-2xl text-[hsl(var(--ocean))]">${totalPrice} CAD</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>• Secure booking flow</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>• Free cancellation up to 48h</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>• Instant confirmation screen</motion.p>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}
