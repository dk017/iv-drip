import { forwardRef } from "react";

interface ReviewItem {
  name: string;
  text: string;
}

const Reviews = forwardRef<HTMLElement>((props, ref) => {
  const reviews: ReviewItem[] = [
    {
      name: "Jessica M.",
      text: "\"After my Myers Cocktail, I felt like a new person! The nurse was professional and made me feel at ease. Will definitely be booking again.\""
    },
    {
      name: "Michael T.",
      text: "\"The Hangover Rescue was a lifesaver! They came to my hotel room and within 30 minutes I was feeling human again. Worth every penny!\""
    },
    {
      name: "Amanda L.",
      text: "\"I've tried the Beauty Glow drip three times now and my skin is noticeably more radiant. The team is always punctual and professional.\""
    }
  ];

  return (
    <section ref={ref} id="reviews" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Clients Say</h2>
          <p className="text-lg max-w-2xl mx-auto">Don't just take our word for it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="italic">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
