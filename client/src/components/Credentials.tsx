import { forwardRef } from "react";

const Credentials = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-16 bg-white" id="credentials">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 text-center shadow-lg transform transition hover:-translate-y-1">
            <div className="bg-primary inline-block p-3 rounded-full mb-4">
              <i className="fas fa-user-nurse text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-2">Registered Nurses</h3>
            <p>All our IV therapies are administered by licensed and experienced registered nurses.</p>
            <div className="mt-4 text-primary text-2xl">✔️</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 text-center shadow-lg transform transition hover:-translate-y-1">
            <div className="bg-primary inline-block p-3 rounded-full mb-4">
              <i className="fas fa-user-md text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-2">Board-Certified Medical Director</h3>
            <p>Our treatments are overseen by a board-certified physician ensuring the highest standards.</p>
            <div className="mt-4 text-primary text-2xl">✔️</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 text-center shadow-lg transform transition hover:-translate-y-1">
            <div className="bg-primary inline-block p-3 rounded-full mb-4">
              <i className="fas fa-map-marker-alt text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-2">Mobile & Lounge Options</h3>
            <p>Choose between our mobile service that comes to you or visit our relaxing IV suite.</p>
            <div className="mt-4 text-primary text-2xl">✔️</div>
          </div>
        </div>
      </div>
    </section>
  );
});

Credentials.displayName = "Credentials";

export default Credentials;
