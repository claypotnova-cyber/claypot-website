"use server";

export type CateringFormData = {
  name: string;
  email: string;
  phone?: string;
  date?: string;
  guests?: string;
  eventType?: string;
  message?: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

/**
 * Handles catering inquiries from the front-end.
 * In a production environment, this would send an email via Resend/SendGrid 
 * or save the inquiry to a database like Supabase.
 */
export async function submitCateringInquiry(_data: CateringFormData) {
  // TODO: Integrate with Resend/SendGrid for email notifications
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: "Your catering inquiry has been received. We will contact you within 24 hours." 
  };
}

/**
 * Handles general contact form submissions.
 */
export async function submitContactForm(_data: ContactFormData) {

  await new Promise((resolve) => setTimeout(resolve, 800));

  return { 
    success: true, 
    message: "Thank you for reaching out! We've received your message and will get back to you soon." 
  };
}
