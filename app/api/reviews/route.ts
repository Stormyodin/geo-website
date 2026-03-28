import { NextResponse } from "next/server";
import { getReviews, saveReview } from "@/lib/reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const context = searchParams.get("context") || "general";
  
  try {
    const reviews = await getReviews(context);
    return NextResponse.json(reviews);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { context, review } = body;
    
    if (!context || !review) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const saved = await saveReview(context, review);
    return NextResponse.json(saved);
  } catch (e) {
    return NextResponse.json({ error: "Failed to post review" }, { status: 500 });
  }
}
