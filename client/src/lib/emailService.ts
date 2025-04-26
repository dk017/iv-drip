import emailjs from '@emailjs/browser';

// We'll fetch these from the server
let SERVICE_ID = '';
let TEMPLATE_ID = '';
let PUBLIC_KEY = '';

// Fetch EmailJS configuration from server
async function fetchEmailConfig() {
  try {
    const response = await fetch('/api/email-config');
    if (!response.ok) {
      throw new Error('Failed to fetch email configuration');
    }
    
    const config = await response.json();
    SERVICE_ID = config.serviceId;
    TEMPLATE_ID = config.templateId;
    PUBLIC_KEY = config.publicKey;
    
    // Initialize EmailJS with fetched key
    emailjs.init(PUBLIC_KEY);
    
    return true;
  } catch (error) {
    console.error('Error fetching email configuration:', error);
    return false;
  }
}

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
    // Make sure we have the EmailJS configuration
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const configSuccess = await fetchEmailConfig();
      if (!configSuccess) {
        throw new Error('Unable to fetch email configuration. Please try again later.');
      }
    }
    
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
export async function initEmailJS() {
  // Fetch configuration from server and initialize EmailJS
  await fetchEmailConfig();
}