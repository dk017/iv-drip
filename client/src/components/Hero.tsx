import { forwardRef } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ onCtaClick }, ref) => {
  return (
    <section 
      ref={ref}
      id="home" 
      className="gradient-bg pt-32 pb-20 md:pt-40 md:pb-32 text-white relative"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Feel Better in 45 Minutes
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light">
            Nurse-driven IV therapy delivered to your door
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={onCtaClick}
              className="bg-white text-primary hover:bg-secondary hover:text-white transition py-6 px-8 rounded-full font-bold text-lg text-center shadow-lg transform hover:scale-105"
            >
              Book a Drip
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#F9F7FF">
          <path d="M0,96L48,80C96,64,192,32,288,26.7C384,21,480,43,576,53.3C672,64,768,64,864,58.7C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
