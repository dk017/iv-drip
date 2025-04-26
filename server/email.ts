import { MailService } from '@sendgrid/mail';

// Initialize SendGrid with API key if available
let mailService: MailService | null = null;

// Check if SendGrid API key is available
if (process.env.SENDGRID_API_KEY) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("SendGrid email service initialized");
} else {
  console.warn("SENDGRID_API_KEY not found. Email functionality will be disabled.");
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  if (!mailService) {
    return {
      success: false,
      message: "SendGrid API key not configured. Cannot send email."
    };
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    
    return {
      success: true,
      message: "Email sent successfully"
    };
  } catch (error) {
    console.error('SendGrid email error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error sending email"
    };
  }
}

// Formats appointment request data into an HTML email
export function formatAppointmentEmail(data: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; padding: 10px; background: #8A2BE2; color: white; border-radius: 5px 5px 0 0;">
        <h2 style="margin: 0;">New Appointment Request</h2>
      </div>
      
      <div style="padding: 20px;">
        <p><strong>Client Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        
        ${data.message ? `<p><strong>Additional Information:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
        
        ${data.utm_source ? `<p><strong>Source:</strong> ${data.utm_source}</p>` : ''}
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
        <p style="margin: 0; color: #666;">This message was sent from your Posh IV Hydration Services website contact form.</p>
      </div>
    </div>
  `;
}