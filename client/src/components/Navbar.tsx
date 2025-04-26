import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

const Navbar = ({ onNavClick }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navElement = document.getElementById("main-nav");
      if (navElement && !navElement.contains(event.target as Node) && window.innerWidth < 768) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavClick(sectionId);
  };

  return (
    <header 
      id="main-nav"
      className={`fixed w-full z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" onClick={() => handleNavClick("home")} className="flex items-center">
          <div className="bg-primary text-white font-montserrat font-bold py-2 px-3 rounded">
            <span className="text-xl tracking-tight">POSH</span>
            <span className="text-sm block -mt-1">IV HYDRATION</span>
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick("home"); }} 
            className="text-primary hover:text-primary/80 transition font-montserrat text-sm font-medium"
          >
            Home
          </a>
          <a 
            href="#ivdrips" 
            onClick={(e) => { e.preventDefault(); handleNavClick("ivdrips"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            IV Drips
          </a>
          <a 
            href="#benefits" 
            onClick={(e) => { e.preventDefault(); handleNavClick("benefits"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            Benefits
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => { e.preventDefault(); handleNavClick("pricing"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            Pricing
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => { e.preventDefault(); handleNavClick("gallery"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            Gallery
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => { e.preventDefault(); handleNavClick("reviews"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            Reviews
          </a>
          <a 
            href="#faq" 
            onClick={(e) => { e.preventDefault(); handleNavClick("faq"); }} 
            className="text-gray-700 hover:text-primary transition font-montserrat text-sm font-medium"
          >
            FAQ
          </a>
          <Button 
            onClick={() => handleNavClick("contact")}
            className="bg-primary hover:bg-primary/90 text-white rounded-full font-montserrat text-sm"
          >
            Book
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-primary focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick("home"); }} 
            className="block text-primary hover:text-primary/80 font-medium"
          >
            Home
          </a>
          <a 
            href="#ivdrips" 
            onClick={(e) => { e.preventDefault(); handleNavClick("ivdrips"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            IV Drips
          </a>
          <a 
            href="#benefits" 
            onClick={(e) => { e.preventDefault(); handleNavClick("benefits"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Benefits
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => { e.preventDefault(); handleNavClick("pricing"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Pricing
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => { e.preventDefault(); handleNavClick("gallery"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Gallery
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => { e.preventDefault(); handleNavClick("reviews"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Reviews
          </a>
          <a 
            href="#faq" 
            onClick={(e) => { e.preventDefault(); handleNavClick("faq"); }} 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            FAQ
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }} 
            className="block bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-full text-center transition"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
