import { forwardRef, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = forwardRef<HTMLElement>((props, ref) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Is IV therapy safe?",
      answer: "Yes, IV therapy is very safe when administered by our licensed registered nurses following strict protocols. All our treatments are overseen by our board-certified medical director. We use only sterile, medical-grade supplies and follow all safety procedures."
    },
    {
      question: "How long does an IV therapy session last?",
      answer: "A typical IV therapy session takes about 45-60 minutes from start to finish. This includes the initial assessment, IV placement, infusion time, and post-treatment monitoring. We ensure you're comfortable throughout the entire process."
    },
    {
      question: "Do I need a doctor's prescription for IV therapy?",
      answer: "No, you don't need a doctor's prescription. Our licensed nurses will perform a brief medical screening and our medical director provides standing orders for our treatments. However, if you have specific medical conditions, we may request additional information before proceeding."
    },
    {
      question: "Are there any side effects?",
      answer: "Most people experience minimal to no side effects. Occasionally, some may experience a cooling sensation during the infusion, a slight metallic taste, or minor discomfort at the IV site. Serious adverse reactions are extremely rare, especially with our thorough screening process."
    },
    {
      question: "How often can I receive IV therapy?",
      answer: "The frequency varies based on your specific needs and the type of IV therapy. Some clients benefit from weekly sessions, while others may find monthly treatments sufficient. Our nurses can recommend an optimal schedule based on your health goals and response to treatment."
    },
    {
      question: "Can I customize my IV therapy?",
      answer: "Yes, we can tailor treatments to your specific needs. While we offer standard formulations that address common concerns, our nurses can adjust or add certain components based on your health assessment. Just let us know your concerns during booking."
    }
  ];

  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  return (
    <section ref={ref} id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-lg max-w-2xl mx-auto">Everything you need to know about our IV therapy services</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleQuestion(index)} 
                className="flex justify-between items-center w-full px-6 py-4 bg-white hover:bg-gray-50 transition text-left font-montserrat font-semibold"
                aria-expanded={activeQuestion === index ? "true" : "false"}
                aria-controls={`faq-${index}`}
              >
                <span>{item.question}</span>
                <i className={`fas ${activeQuestion === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </button>
              <div 
                id={`faq-${index}`} 
                className={`px-6 py-4 bg-white border-t transition-all duration-300 ease-in-out ${
                  activeQuestion === index ? 'block' : 'hidden'
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = "FAQ";

export default FAQ;
