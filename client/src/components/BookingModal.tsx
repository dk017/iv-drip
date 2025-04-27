import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingModalProps {
  buttonText?: string;
  buttonClassName?: string;
  calendlyUrl?: string;
}

const BookingModal = ({
  buttonText = "Book an Appointment",
  buttonClassName = "bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition flex items-center justify-center",
  calendlyUrl = "https://calendly.com/dhineshkumar-r/30min",
}: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load Calendly script when modal opens
    if (isOpen) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script when modal closes
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>
          <i className="far fa-calendar-alt mr-2"></i> {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[80vh] p-0">
        <div
          className="calendly-inline-widget w-full h-full"
          data-url={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f9f7ff&text_color=333333&primary_color=8A2BE2`}
        ></div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
