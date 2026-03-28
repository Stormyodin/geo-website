import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";

// ════════════════════════════════════════════════════════
// SUPABASE CONFIG (Recommended for Vercel persistence)
// ════════════════════════════════════════════════════════
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ════════════════════════════════════════════════════════
// LOCAL FALLBACK (Fallback for dev or while setting up keys)
// ════════════════════════════════════════════════════════
const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

const ensureDataDir = async () => {
  // Only attempt FS operations if not running on Vercel (where it crashes)
  if (process.env.VERCEL) return;
  
  try {
    const dir = path.dirname(REVIEWS_FILE);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true }).catch(() => {});
    }
  } catch (err) {}
};

export async function getReviews(context: string) {
  // 1. Try Supabase first if keys are provided
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("context", context)
        .order("created_at", { ascending: false });
      
      if (!error && data) return data.map(r => r.data_json);
    } catch (e) {
      console.error("Supabase fetch failed, trying local...");
    }
  }

  // 2. Fallback to file system (for local dev)
  if (!process.env.VERCEL) {
    await ensureDataDir();
    try {
      const data = await fs.readFile(REVIEWS_FILE, "utf-8").catch(() => "{}");
      const json = JSON.parse(data || "{}");
      return Array.isArray(json[context]) ? json[context] : [];
    } catch (e) {
      return [];
    }
  }

  return [];
}

export async function saveReview(context: string, review: any) {
  // 1. Try Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([{ 
          context, 
          data_json: review,
          author_name: review.name 
        }]);
      
      if (!error) return review;
    } catch (e) {
      console.error("Supabase insert failed, trying local...");
    }
  }

  // 2. Fallback to Local FS (won't persist on Vercel, but won't crash)
  if (!process.env.VERCEL) {
    await ensureDataDir();
    try {
      const data = await fs.readFile(REVIEWS_FILE, "utf-8").catch(() => "{}");
      const json = JSON.parse(data || "{}");
      if (!json[context]) json[context] = [];
      json[context].unshift(review);
      await fs.writeFile(REVIEWS_FILE, JSON.stringify(json, null, 2));
      return review;
    } catch (e) {}
  }

  return review;
}
