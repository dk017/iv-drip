import { forwardRef } from "react";
import { Button } from "@/components/ui/button";

interface PricingItem {
  package: string;
  price: string;
  notes: string;
}

const Pricing = forwardRef<HTMLElement>((props, ref) => {
  const pricingItems: PricingItem[] = [
    {
      package: "Myers Cocktail",
      price: "$199",
      notes: "In-suite $179"
    },
    {
      package: "Immunity Boost",
      price: "$189",
      notes: ""
    },
    {
      package: "Hangover Rescue",
      price: "$179",
      notes: "Evening surcharge +$25"
    },
    {
      package: "Beauty Glow",
      price: "$209",
      notes: "Biotin boost"
    },
    {
      package: "Migraine Relief",
      price: "$189",
      notes: "Includes Toradol"
    },
    {
      package: "Athletic Recovery",
      price: "$199",
      notes: "EMS add-on +$40"
    }
  ];

  return (
    <section ref={ref} id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Pricing</h2>
          <p className="text-lg max-w-2xl mx-auto">Transparent pricing with no hidden fees</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-4 text-left font-montserrat">Package</th>
                <th className="px-6 py-4 text-center font-montserrat">Price</th>
                <th className="px-6 py-4 text-left font-montserrat">Notes</th>
              </tr>
            </thead>
            <tbody>
              {pricingItems.map((item, index) => (
                <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-50' : ''} ${index < pricingItems.length - 1 ? 'border-b' : ''}`}>
                  <td className="px-6 py-4 font-semibold">{item.package}</td>
                  <td className="px-6 py-4 text-center font-bold">{item.price}</td>
                  <td className="px-6 py-4">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-10 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a 
              href="tel:303-503-4955" 
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition flex items-center justify-center"
            >
              <i className="fas fa-phone mr-2"></i> Tap to Call
            </a>
            <a 
              href="https://wa.me/13035034955" 
              rel="nofollow noopener" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition flex items-center justify-center"
            >
              <i className="fab fa-whatsapp mr-2"></i> Request Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

export default Pricing;
