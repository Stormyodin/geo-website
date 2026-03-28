"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioFeedback";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  media: { url: string; type: "image" | "video" }[];
}

export default function ReviewSection({ context = "general", title = "Visitor Stories" }: { context?: string; title?: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [media, setMedia] = useState<{ url: string; type: "image" | "video" }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { play } = useAudio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load reviews from API on mount
  useEffect(() => {
    let isCancelled = false;
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/reviews?context=${context}`);
        if (!isCancelled && response.ok) {
          const data = await response.json();
          setReviews(data || []);
        }
      } catch (e) {
        console.error("Failed to fetch reviews", e);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    fetchReviews();
    return () => { isCancelled = true; };
  }, [context]);

  // Saving is now handled via the POST request in handleSubmit

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const type: "image" | "video" = file.type.startsWith("video/") ? "video" : "image";
      
      reader.onloadend = () => {
        setMedia((prev) => [...prev, { url: reader.result as string, type }]);
        play("pop");
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    play("click");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setIsSubmitting(true);
    play("click");

    // Save to server
    const newReview: Review = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
      media
    };

    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context, review: newReview })
    })
      .then((res) => res.json())
      .then((saved) => {
        setReviews((prev) => [saved, ...prev]);
        setName("");
        setRating(5);
        setComment("");
        setMedia([]);
        setIsSubmitting(false);
        setIsFormOpen(false);
        play("success");
      })
      .catch((err) => {
        console.error("Failed to save review", err);
        setIsSubmitting(false);
        play("error");
      });
  };

  return (
    <section id="reviews" style={{ padding: "6rem 1rem", background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              style={{ color: "hsl(var(--primary))", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}
            >
              Guest Experiences
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: "2.5rem", margin: 0, fontWeight: 300 }}
            >
              {title}
            </motion.h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              play("click");
            }}
            style={{
              background: "hsl(var(--primary))",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 10px 20px rgba(var(--primary), 0.2)"
            }}
          >
            {isFormOpen ? "Cancel" : "Add a Review"}
          </motion.button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "4rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{ 
                overflow: "hidden", 
                background: "hsl(var(--card))", 
                borderRadius: "1rem", 
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "hsl(var(--muted-foreground))" }}>Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      style={{ 
                        width: "100%", 
                        padding: "0.75rem", 
                        borderRadius: "0.5rem", 
                        background: "hsl(var(--secondary))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "hsl(var(--muted-foreground))" }}>Rating</label>
                    <div style={{ display: "flex", gap: "0.5rem", fontSize: "1.5rem" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setRating(star);
                            play("pop");
                          }}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                          <span style={{ color: star <= rating ? "hsl(var(--accent))" : "hsl(var(--muted))" }}>★</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "hsl(var(--muted-foreground))" }}>Your Experience</label>
                  <textarea 
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your trip..."
                    rows={4}
                    style={{ 
                      width: "100%", 
                      padding: "0.75rem", 
                      borderRadius: "0.5rem", 
                      background: "hsl(var(--secondary))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                      resize: "vertical"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem", color: "hsl(var(--muted-foreground))" }}>Add Photos or Videos</label>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                    <AnimatePresence>
                      {media.map((item, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          style={{ position: "relative", width: "80px", height: "80px", borderRadius: "0.5rem", overflow: "hidden" }}
                        >
                          {item.type === "image" ? (
                            <img src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          )}
                          <button 
                            type="button"
                            onClick={() => removeMedia(idx)}
                            style={{ 
                              position: "absolute", top: "2px", right: "2px", 
                              background: "rgba(0,0,0,0.5)", color: "white", 
                              border: "none", borderRadius: "50%", 
                              width: "20px", height: "20px", fontSize: "10px", 
                              cursor: "pointer", display: "flex", 
                              alignItems: "center", justifyContent: "center" 
                            }}
                          >
                            ✕
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onMouseEnter={() => play("hover")}
                      style={{ 
                        width: "80px", height: "80px", 
                        borderRadius: "0.5rem", 
                        border: "2px dashed hsl(var(--border))", 
                        background: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "hsl(var(--muted-foreground))",
                        fontSize: "1.5rem"
                      }}
                    >
                      +
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleMediaUpload}
                      multiple
                      accept="image/*,video/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    background: "hsl(var(--primary))",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "all 0.2s"
                  }}
                >
                  {isSubmitting ? "Sharing..." : "Post Review"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div style={{ display: "grid", gap: "2rem" }}>
          <AnimatePresence initial={false}>
            {isLoading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "4rem", textAlign: "center", color: "hsl(var(--muted-foreground))" }}>
                Loading visitor stories...
              </motion.div>
            ) : reviews.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "4rem", textAlign: "center", border: "2px dashed hsl(var(--border))", borderRadius: "1rem", color: "hsl(var(--muted-foreground))" }}>
                No reviews yet. Be the first to share your experience!
              </motion.div>
            ) : (
              reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                layout
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: "hsl(var(--card))",
                  padding: "2rem",
                  borderRadius: "1.25rem",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  display: "grid",
                  gridTemplateColumns: review.media.length > 0 ? "1fr 240px" : "1fr",
                  gap: "2rem"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{review.name}</h4>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{review.date}</p>
                    </div>
                    <div style={{ color: "hsl(var(--accent))", letterSpacing: "2px" }}>
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p style={{ color: "hsl(var(--foreground))", lineHeight: 1.7, margin: 0, fontSize: "1rem" }}>
                    {review.comment}
                  </p>
                </div>

                {review.media.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "0.5rem" }}>
                    {review.media.map((item, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        style={{ 
                          borderRadius: "0.75rem", 
                          overflow: "hidden", 
                          aspectRatio: "1",
                          border: "1px solid hsl(var(--border))",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                      >
                        {item.type === "image" ? (
                          <img src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <video src={item.url} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
