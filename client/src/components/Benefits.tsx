import { forwardRef } from "react";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

const Benefits = forwardRef<HTMLElement>((props, ref) => {
  const benefits: BenefitItem[] = [
    {
      icon: "fas fa-tint",
      title: "Fast Hydration",
      description: "Rapidly rehydrate your body at the cellular level with 100% absorption rate."
    },
    {
      icon: "fas fa-pills",
      title: "Vitamin Absorption",
      description: "Bypass digestive system limitations for maximum nutrient absorption."
    },
    {
      icon: "fas fa-brain",
      title: "Headache Relief",
      description: "Experience immediate relief from migraines and tension headaches."
    },
    {
      icon: "fas fa-bolt",
      title: "Energy Lift",
      description: "Boost your energy levels without the crash of caffeine or energy drinks."
    }
  ];

  return (
    <section ref={ref} id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose IV Therapy?</h2>
          <p className="text-lg max-w-2xl mx-auto">Experience the benefits of direct-to-bloodstream vitamin delivery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className={`${benefit.icon} text-primary text-3xl`}></i>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-2">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Benefits.displayName = "Benefits";

export default Benefits;
