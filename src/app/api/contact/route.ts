import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

interface ContactFormData {
  name: string
  email: string
  contact: string
  country: string
  productInterested: string
  message: string
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || process.env.SMTP_HOST,
    port: parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME || process.env.SMTP_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD,
    },
  })
}

// Email template for admin
const getAdminEmailTemplate = (data: ContactFormData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #059669; }
    .value { margin-top: 5px; }
    .footer { background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Pyramid Agro Exports</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${data.email}</div>
      </div>
      <div class="field">
        <div class="label">Contact Number:</div>
        <div class="value">${data.contact}</div>
      </div>
      <div class="field">
        <div class="label">Country:</div>
        <div class="value">${data.country}</div>
      </div>
      <div class="field">
        <div class="label">Product Interested:</div>
        <div class="value">${data.productInterested}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${data.message}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the contact form on pyramidagroexports.com
    </div>
  </div>
</body>
</html>
`
}

// Email template for user confirmation
const getUserEmailTemplate = (data: ContactFormData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .footer { background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
    .contact-info { background: white; padding: 15px; border-radius: 8px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Pyramid Agro Exports</p>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      <p>Thank you for reaching out to Pyramid Agro Exports. We have received your inquiry and our team will get back to you within 24-48 hours.</p>
      
      <p><strong>Your Inquiry Details:</strong></p>
      <ul>
        <li><strong>Product Interested:</strong> ${data.productInterested}</li>
        <li><strong>Country:</strong> ${data.country}</li>
      </ul>
      
      <div class="contact-info">
        <p style="margin: 0 0 10px 0;"><strong>In the meantime, you can reach us at:</strong></p>
        <p style="margin: 5px 0;">📞 Phone: +91 91300 70701</p>
        <p style="margin: 5px 0;">📱 WhatsApp: +91 91300 70701</p>
        <p style="margin: 5px 0;">📧 Email: pyramidagroexports@gmail.com</p>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0;">Pyramid Agro Exports</p>
      <p style="margin: 5px 0 0 0;">Office, Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra, India 422003</p>
    </div>
  </div>
</body>
</html>
`
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    const missingFields = []
    if (!body.name) missingFields.push("name")
    if (!body.email) missingFields.push("email")
    if (!body.contact) missingFields.push("contact")
    if (!body.country) missingFields.push("country")
    if (!body.message) missingFields.push("message")
    
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields, "Body received:", body)
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Save enquiry to database
    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: body.name,
        email: body.email,
        contact: body.contact,
        country: body.country,
        productInterested: body.productInterested || "",
        message: body.message,
      }
    })

    console.log("Contact enquiry saved:", enquiry.id)

    // Check if email is configured (support both EMAIL_* and SMTP_* naming)
    const emailHost = process.env.EMAIL_HOST || process.env.SMTP_HOST
    const emailUser = process.env.EMAIL_USERNAME || process.env.SMTP_USER
    const emailPass = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD
    
    if (!emailHost || !emailUser || !emailPass) {
      console.warn("Email not configured. Enquiry saved but email not sent.")
      return NextResponse.json(
        { message: "Message received successfully", enquiryId: enquiry.id },
        { status: 200 }
      )
    }

    const transporter = createTransporter()

    // Send email to admin
    await transporter.sendMail({
      from: {
        name: "Pyramid Agro Exports",
        address: emailUser,
      },
      to: process.env.ADMIN_EMAIL || "pyramidagroexports@gmail.com",
      subject: `New Contact Form Submission from ${body.name}`,
      html: getAdminEmailTemplate(body),
      replyTo: body.email,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: {
        name: "Pyramid Agro Exports",
        address: emailUser,
      },
      to: body.email,
      subject: "Thank you for contacting Pyramid Agro Exports",
      html: getUserEmailTemplate(body),
    })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending contact form:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
