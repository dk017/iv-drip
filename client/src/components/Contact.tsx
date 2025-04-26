import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "./ContactForm";

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Find Us</h2>
          <p className="text-lg max-w-2xl mx-auto">Visit our luxury IV suite or schedule a mobile appointment</p>
        </div>
        
        <Tabs defaultValue="info" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="info">Contact Info</TabsTrigger>
            <TabsTrigger value="form">Request Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                {/* Google Maps Embed */}
                <div className="bg-gray-200 rounded-xl overflow-hidden h-80 md:h-96">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.2280227347703!2d-104.98971388462448!3d39.73704797945087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c7f2838262753%3A0x9a73d3fab28340e9!2s1234%20Speer%20Blvd%2C%20Denver%2C%20CO%2080219!5e0!3m2!1sen!2sus!4v1651518854355!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Posh IV Hydration Location"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://goo.gl/maps/YbNDXXXpQFvuA1234" 
                    target="_blank" 
                    rel="nofollow noopener" 
                    className="inline-flex items-center text-primary hover:text-primary/80 transition"
                  >
                    <i className="fas fa-directions mr-2"></i> Get Directions
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-gray-50 p-8 rounded-xl">
                <h3 className="font-montserrat font-bold text-xl mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-2 mr-4 text-white">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p>1234 Speer Blvd, Suite 100<br />Denver, CO 80219</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-2 mr-4 text-white">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p><a href="tel:303-503-4955" className="hover:text-primary">303-503-4955</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-2 mr-4 text-white">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p><a href="mailto:support@poshhydration.com" className="hover:text-primary">support@poshhydration.com</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-2 mr-4 text-white">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Hours</h4>
                      <p>9:00 am – 9:00 pm<br />7 days a week</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a 
                    href="tel:303-503-4955" 
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition inline-block w-full text-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="form" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="font-montserrat font-bold text-xl">Book Your IV Therapy Session</h3>
                <p className="text-gray-600">Fill out the form below and we'll contact you to confirm your appointment</p>
              </div>
              
              <ContactForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
