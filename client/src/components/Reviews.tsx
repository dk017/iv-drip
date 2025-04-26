import { forwardRef, useState, useEffect } from "react";
import { getGoogleReviews, fallbackReviews } from "../lib/reviewsService";
import { useQuery } from "@tanstack/react-query";

interface ReviewItem {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

interface ReviewsData {
  rating: number;
  reviews: ReviewItem[];
}

const Reviews = forwardRef<HTMLElement>((props, ref) => {
  const [overallRating, setOverallRating] = useState(5.0);
  
  // Fetch Google reviews
  const { data: reviewsData, isLoading, isError } = useQuery<ReviewsData>({
    queryKey: ['/api/reviews'],
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
  
  // Use reviews from API or fallback to pre-defined reviews if API fails
  const reviews: ReviewItem[] = reviewsData?.reviews || fallbackReviews;
  
  useEffect(() => {
    if (reviewsData?.rating) {
      setOverallRating(reviewsData.rating);
    }
  }, [reviewsData]);
  
  // Format time to readable format
  const formatReviewDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Generate star rating elements
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section ref={ref} id="reviews" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Clients Say</h2>
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400 text-xl mr-2">
              {renderStars(overallRating)}
            </div>
            <span className="font-bold">{overallRating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2">overall rating</span>
          </div>
          <p className="text-lg max-w-2xl mx-auto">Real reviews from our happy clients</p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4">Loading reviews...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review: ReviewItem, index: number) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <i className="fas fa-user text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{review.author_name}</h4>
                    <div className="flex text-yellow-400">
                      {renderStars(review.rating)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatReviewDate(review.time)}
                    </div>
                  </div>
                </div>
                <p className="italic">{review.text}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Reviews powered by Google • <a href="https://g.page/r/PLACE_ID/review" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Write a review</a>
          </p>
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
