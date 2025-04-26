import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from 'axios';

export async function registerRoutes(app: Express): Promise<Server> {
  // Google Places API endpoint
  app.get('/api/reviews', async (req: Request, res: Response) => {
    try {
      // Check if we have the Google Places API key
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      
      if (!apiKey) {
        return res.status(503).json({ 
          error: 'API key not configured', 
          message: 'Google Places API key is not available' 
        });
      }
      
      // This would be the actual place ID for Posh IV Hydration Services
      // For now, using a placeholder that would need to be replaced with the real one
      const placeId = process.env.GOOGLE_PLACE_ID || 'placeholder_place_id';
      
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
      
      const response = await axios.get(url);
      
      if (response.data.status === 'OK') {
        const { rating, reviews } = response.data.result;
        
        return res.json({
          rating,
          reviews: reviews.map((review: any) => ({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time
          }))
        });
      } else {
        throw new Error(`Google API error: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch reviews', 
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Email submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, phone, serviceType, preferredDate, preferredTime, message, utm_source } = req.body;
      
      // Log the form submission
      console.log('Contact form submission:', {
        name, email, phone, serviceType, preferredDate, preferredTime, message, utm_source
      });
      
      // Import email functions - This is done here to prevent errors on startup if SendGrid key is missing
      const { sendEmail, formatAppointmentEmail } = await import('./email');
      
      // Send email notification
      const emailResult = await sendEmail({
        to: 'support@poshhydration.com', // Replace with business email when in production
        from: 'appointments@poshhydration.com', // Must be verified in SendGrid
        subject: `New Appointment Request from ${name}`,
        html: formatAppointmentEmail({
          name, email, phone, serviceType, preferredDate, preferredTime, message, utm_source
        })
      });
      
      if (!emailResult.success) {
        console.warn('Email sending failed:', emailResult.message);
        // We still return success to the client since we've logged the request
        // In production, you might want to handle this differently
      }
      
      return res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        error: 'Failed to process form', 
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
