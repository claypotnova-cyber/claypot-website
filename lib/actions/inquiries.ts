"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "info@claypotva.com";
const FROM_EMAIL = "Clay Pot Website <noreply@claypotva.com>";

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

export async function submitCateringInquiry(data: CateringFormData) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `New Catering Inquiry — ${data.name}`,
      html: `
        <h2>New Catering Inquiry</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          ${data.phone ? `<tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>` : ""}
          ${data.date ? `<tr><td><strong>Event Date</strong></td><td>${data.date}</td></tr>` : ""}
          ${data.guests ? `<tr><td><strong>Guest Count</strong></td><td>${data.guests}</td></tr>` : ""}
          ${data.eventType ? `<tr><td><strong>Event Type</strong></td><td>${data.eventType}</td></tr>` : ""}
          ${data.message ? `<tr><td><strong>Message</strong></td><td>${data.message}</td></tr>` : ""}
        </table>
      `,
    });

    return {
      success: true,
      message: "Your catering inquiry has been received. We will contact you within 24 hours.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please call us directly at (571) 299-3725.",
    };
  }
}

export async function submitContactForm(data: ContactFormData) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `New Contact Message — ${data.subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          ${data.subject ? `<tr><td><strong>Subject</strong></td><td>${data.subject}</td></tr>` : ""}
          <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
        </table>
      `,
    });

    return {
      success: true,
      message: "Thank you for reaching out! We've received your message and will get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please call us directly at (571) 299-3725.",
    };
  }
}
