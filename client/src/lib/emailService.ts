import emailjs from '@emailjs/browser';

// Get EmailJS credentials from environment variables
const SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY as string;

export interface EmailParams {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  utm_source?: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  try {
    // Format the serviceType to be more readable (convert "myerscocktail" to "Myers Cocktail")
    let formattedServiceType = params.serviceType;
    
    // Map of service types to readable names
    const serviceTypeMap: Record<string, string> = {
      'myers': 'Myers Cocktail',
      'immunity': 'Immunity Boost',
      'hangover': 'Hangover Rescue',
      'beauty': 'Beauty Glow',
      'migraine': 'Migraine Relief',
      'athletic': 'Athletic Recovery',
      'custom': 'Custom / Not Sure',
    };
    
    if (serviceTypeMap[params.serviceType]) {
      formattedServiceType = serviceTypeMap[params.serviceType];
    }
    
    // Format the time slot to be more readable
    let formattedTimeSlot = params.preferredTime;
    
    const timeSlotMap: Record<string, string> = {
      'morning': 'Morning (9am-12pm)',
      'afternoon': 'Afternoon (12pm-5pm)',
      'evening': 'Evening (5pm-9pm)',
    };
    
    if (timeSlotMap[params.preferredTime]) {
      formattedTimeSlot = timeSlotMap[params.preferredTime];
    }
    
    // Prepare template parameters
    const templateParams = {
      from_name: params.name,
      from_email: params.email,
      phone: params.phone,
      service_type: formattedServiceType,
      preferred_date: params.preferredDate,
      preferred_time: formattedTimeSlot,
      message: params.message || 'No additional message',
      utm_source: params.utm_source || 'Direct',
    };
    
    // Send the email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    
    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error sending email',
    };
  }
}

// Initialize EmailJS
export function initEmailJS() {
  emailjs.init(PUBLIC_KEY);
}