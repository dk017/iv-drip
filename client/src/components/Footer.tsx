import { forwardRef } from "react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ onNavClick }, ref) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavClick(sectionId);
  };

  return (
    <footer className="bg-primary/90 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white text-primary font-montserrat font-bold py-2 px-3 rounded inline-block mb-4">
              <span className="text-xl tracking-tight">POSH</span>
              <span className="text-sm block -mt-1">IV HYDRATION</span>
            </div>
            <p className="text-gray-300">Luxury Drip Therapy — Anywhere in Denver</p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, "home")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#ivdrips" 
                  onClick={(e) => handleNavClick(e, "ivdrips")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  IV Drips
                </a>
              </li>
              <li>
                <a 
                  href="#benefits" 
                  onClick={(e) => handleNavClick(e, "benefits")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => handleNavClick(e, "pricing")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#reviews" 
                  onClick={(e) => handleNavClick(e, "reviews")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleNavClick(e, "faq")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, "contact")} 
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-bold text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <i className="fab fa-yelp text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <p className="mb-4">*These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          <p>&copy; {new Date().getFullYear()} Posh IV Hydration Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
