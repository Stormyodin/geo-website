import fs from "fs";
import path from "path";

// Use a more stable path resolution
const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

const ensureDataDir = () => {
  try {
    const dir = path.dirname(REVIEWS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify({}, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Critical: Failed to initialize data directory", err);
  }
};

export async function getReviews(context: string) {
  ensureDataDir();
  try {
    if (!fs.existsSync(REVIEWS_FILE)) return [];
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    if (!data || data.trim() === "") return [];
    const json = JSON.parse(data);
    return Array.isArray(json[context]) ? json[context] : [];
  } catch (e) {
    console.error("Error reading reviews for context:", context, e);
    return [];
  }
}

export async function saveReview(context: string, review: any) {
  ensureDataDir();
  try {
    const data = fs.existsSync(REVIEWS_FILE) ? fs.readFileSync(REVIEWS_FILE, "utf-8") : "{}";
    const json = JSON.parse(data || "{}");
    
    if (!json[context] || !Array.isArray(json[context])) {
      json[context] = [];
    }
    
    json[context].unshift(review);
    
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(json, null, 2), "utf-8");
    return review;
  } catch (e) {
    console.error("Error saving review to context:", context, e);
    throw new Error("Persistence error");
  }
}
