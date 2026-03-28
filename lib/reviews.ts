import { promises as fs } from "fs";
import path from "path";

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

const ensureDataDir = async () => {
  try {
    const dir = path.dirname(REVIEWS_FILE);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
    
    try {
      await fs.access(REVIEWS_FILE);
    } catch {
      await fs.writeFile(REVIEWS_FILE, JSON.stringify({}, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("FileSystem Error in lib/reviews.ts:", err);
  }
};

export async function getReviews(context: string) {
  await ensureDataDir();
  try {
    const data = await fs.readFile(REVIEWS_FILE, "utf-8");
    if (!data || data.trim() === "") return [];
    const json = JSON.parse(data);
    return Array.isArray(json[context]) ? json[context] : [];
  } catch (e) {
    console.error(`Error reading context '${context}':`, e);
    return [];
  }
}

export async function saveReview(context: string, review: any) {
  await ensureDataDir();
  try {
    const data = await fs.readFile(REVIEWS_FILE, "utf-8").catch(() => "{}");
    const json = JSON.parse(data || "{}");
    
    if (!json[context] || !Array.isArray(json[context])) {
      json[context] = [];
    }
    
    json[context].unshift(review);
    
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(json, null, 2), "utf-8");
    return review;
  } catch (e) {
    console.error(`Error saving context '${context}':`, e);
    throw e;
  }
}
