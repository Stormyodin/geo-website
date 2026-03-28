import fs from "fs";
import path from "path";

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(REVIEWS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify({}));
  }
};

export async function getReviews(context: string) {
  ensureDataDir();
  try {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const json = JSON.parse(data);
    return json[context] || [];
  } catch (e) {
    console.error("Error reading reviews", e);
    return [];
  }
}

export async function saveReview(context: string, review: any) {
  ensureDataDir();
  try {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const json = JSON.parse(data);
    if (!json[context]) json[context] = [];
    
    // Add new review at the beginning
    json[context] = [review, ...json[context]];
    
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(json, null, 2));
    return review;
  } catch (e) {
    console.error("Error saving review", e);
    throw new Error("Failed to save review");
  }
}
