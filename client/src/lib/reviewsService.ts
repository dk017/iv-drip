// Reviews service to fetch from Google Places API

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

interface PlaceDetails {
  rating: number;
  reviews: Review[];
}

interface CachedReviews {
  timestamp: number;
  data: PlaceDetails;
}

const CACHE_KEY = 'posh_iv_google_reviews';
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const API_ENDPOINT = '/api/reviews'; // We'll implement this endpoint on the server

export async function getGoogleReviews(): Promise<PlaceDetails | null> {
  try {
    // Check for cached reviews first
    const cachedReviews = localStorage.getItem(CACHE_KEY);
    
    if (cachedReviews) {
      const { timestamp, data }: CachedReviews = JSON.parse(cachedReviews);
      const now = Date.now();
      
      // If cache is still valid, use it
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    
    // Otherwise fetch fresh data
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    const data: PlaceDetails = await response.json();
    
    // Cache the result
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
    
    return data;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

// Fallback reviews in case API is not available
export const fallbackReviews: Review[] = [
  {
    author_name: "Sarah M.",
    rating: 5,
    text: "Absolutely life-changing! I was struggling with fatigue for months until I tried their immunity boost IV. The staff was professional and the entire experience was so relaxing.",
    time: Date.now() / 1000 - 86400 * 14 // 14 days ago
  },
  {
    author_name: "Michael T.",
    rating: 5,
    text: "After a long weekend, their Hangover Rescue IV was exactly what I needed. Felt revitalized within an hour. Great service in a luxurious environment.",
    time: Date.now() / 1000 - 86400 * 30 // 30 days ago
  },
  {
    author_name: "Jennifer K.",
    rating: 5,
    text: "The Athletic Recovery drip helped me bounce back quickly after my marathon. The staff was knowledgeable and made me feel comfortable throughout the process.",
    time: Date.now() / 1000 - 86400 * 45 // 45 days ago
  }
];