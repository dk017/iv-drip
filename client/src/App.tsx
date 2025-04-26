import { useEffect, useRef } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Credentials from "./components/Credentials";
import IVDrips from "./components/IVDrips";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const sectionsRef = useRef<{
    [key: string]: HTMLElement | null;
  }>({});

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      
      // Add highlight effect
      section.classList.add("highlight-section");
      
      // Remove highlight effect after animation completes
      setTimeout(() => {
        section.classList.remove("highlight-section");
      }, 2000);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Navbar onNavClick={scrollToSection} />
        <Hero 
          ref={(el) => (sectionsRef.current["home"] = el)} 
          onCtaClick={() => scrollToSection("pricing")} 
        />
        <Credentials ref={(el) => (sectionsRef.current["credentials"] = el)} />
        <IVDrips ref={(el) => (sectionsRef.current["ivdrips"] = el)} />
        <Benefits ref={(el) => (sectionsRef.current["benefits"] = el)} />
        <Pricing ref={(el) => (sectionsRef.current["pricing"] = el)} />
        <Reviews ref={(el) => (sectionsRef.current["reviews"] = el)} />
        <FAQ ref={(el) => (sectionsRef.current["faq"] = el)} />
        <Contact ref={(el) => (sectionsRef.current["contact"] = el)} />
        <Footer onNavClick={scrollToSection} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
