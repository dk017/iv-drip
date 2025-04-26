import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface DrinkDetail {
  id: string;
  title: string;
  icon: string;
  benefits: string[];
  ingredients: string[];
}

const IVDrips = forwardRef<HTMLElement>((props, ref) => {
  const [activeDetails, setActiveDetails] = useState<string | null>(null);
  
  const drips: DrinkDetail[] = [
    {
      id: "myers",
      title: "Myers Cocktail",
      icon: "fas fa-cocktail",
      benefits: [
        "Overall wellness & immunity",
        "Boost energy levels",
        "Reduce fatigue & brain fog"
      ],
      ingredients: [
        "Vitamin C (high dose)",
        "B Complex Vitamins",
        "Magnesium",
        "Calcium",
        "Hydration solution"
      ]
    },
    {
      id: "immunity",
      title: "Immunity Boost",
      icon: "fas fa-shield-alt",
      benefits: [
        "Strengthen immune system",
        "Fight off infections",
        "High-dose antioxidants"
      ],
      ingredients: [
        "Ultra-high dose Vitamin C",
        "Zinc",
        "Vitamin D",
        "Glutathione",
        "Hydration solution"
      ]
    },
    {
      id: "hangover",
      title: "Hangover Rescue",
      icon: "fas fa-wine-glass-alt",
      benefits: [
        "Rapid rehydration",
        "Nausea & headache relief",
        "Detoxification support"
      ],
      ingredients: [
        "Extra-strength electrolytes",
        "B Complex Vitamins",
        "Anti-nausea medication",
        "Toradol (pain relief)",
        "Hydration solution (1L)"
      ]
    },
    {
      id: "beauty",
      title: "Beauty Glow",
      icon: "fas fa-gem",
      benefits: [
        "Radiant skin",
        "Hair & nail strength",
        "Collagen support"
      ],
      ingredients: [
        "Biotin",
        "Glutathione (skin brightening)",
        "Vitamin C",
        "Zinc",
        "B Complex vitamins",
        "Hydration solution"
      ]
    },
    {
      id: "migraine",
      title: "Migraine Relief",
      icon: "fas fa-head-side-virus",
      benefits: [
        "Rapid headache relief",
        "Anti-inflammatory",
        "Nausea reduction"
      ],
      ingredients: [
        "Toradol (ketorolac)",
        "Magnesium",
        "B Complex vitamins",
        "Anti-nausea medication",
        "Hydration solution"
      ]
    },
    {
      id: "athletic",
      title: "Athletic Recovery",
      icon: "fas fa-running",
      benefits: [
        "Muscle recovery",
        "Reduce soreness",
        "Enhanced performance"
      ],
      ingredients: [
        "Amino acids",
        "L-Glutamine",
        "Electrolyte complex",
        "B Complex vitamins",
        "Vitamin C",
        "Extra hydration solution (1L)"
      ]
    }
  ];

  const toggleDetails = (id: string) => {
    if (activeDetails === id) {
      setActiveDetails(null);
    } else {
      setActiveDetails(id);
    }
  };

  return (
    <section ref={ref} id="ivdrips" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Premium IV Drips</h2>
          <p className="text-lg max-w-2xl mx-auto">Choose from our selection of vitamin-rich IV therapies customized for your specific needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drips.map((drip) => (
            <div key={drip.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className={`${drip.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-3 text-center">{drip.title}</h3>
                <ul className="space-y-2 mb-4">
                  {drip.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-primary mt-1 mr-2"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => toggleDetails(drip.id)} 
                  variant="ghost"
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary rounded"
                >
                  {activeDetails === drip.id ? 'Hide Details' : 'Show Details'}
                </Button>
              </div>
              <div 
                className={`bg-gray-50 p-6 border-t transition-all duration-300 ease-in-out ${
                  activeDetails === drip.id ? 'block' : 'hidden'
                }`}
              >
                <h4 className="font-bold mb-2">Ingredients:</h4>
                <ul className="text-sm space-y-1">
                  {drip.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

IVDrips.displayName = "IVDrips";

export default IVDrips;
