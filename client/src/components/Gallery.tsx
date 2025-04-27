import { forwardRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const Gallery = forwardRef<HTMLElement>((props, ref) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // This would be replaced with real images from the business
  const galleryImages: GalleryImage[] = [
    {
      src: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "IV infusion setup in luxury spa setting",
      caption: "Our luxury IV therapy lounge"
    },
    {
      src: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "IV bag with vitamin infusion",
      caption: "Premium vitamin cocktails"
    },
    {
      src: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Comfortable treatment room",
      caption: "Relax in our private treatment rooms"
    },
    {
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Medical professional preparing IV therapy",
      caption: "Our certified professionals ensure safety and comfort"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Vitamin vials for custom IV drips",
      caption: "Premium medical-grade vitamins and nutrients"
    },
    {
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Mobile IV therapy in hotel setting",
      caption: "Mobile IV therapy - we come to you"
    }
  ];

  return (
    <section ref={ref} id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Wellness Space</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Experience our premium IV therapy in elegant and comfortable surroundings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className="group relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-end">
                    <div className="p-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-medium">{image.caption}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none shadow-none">
                <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-contain max-h-[80vh]"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-60 p-4">
                      <p className="text-white text-center">{image.caption}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-6">
            Visit our wellness location and experience the difference of Posh IV Hydration Services.
            We pride ourselves on creating a comfortable, safe, and luxurious environment for all your IV therapy needs.
          </p>
          <Button className="bg-primary hover:bg-primary/90 mt-2">
            <i className="fas fa-map-marker-alt mr-2"></i> Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;