import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Pyramid Agro Export - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Email Verification</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">Verify Your Email Address</h2>
            <p style="color: #6b7280; margin: 0 0 20px 0; line-height: 1.6;">
              Please use the following OTP to verify your email address:
            </p>
            
            <div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Your verification code is:</p>
              <div style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #6b7280; margin: 20px 0 0 0; font-size: 14px; line-height: 1.6;">
              This OTP is valid for 10 minutes. If you didn't request this verification, please ignore this email.
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending OTP email:', error)
    return { success: false, error: 'Failed to send verification email' }
  }
}
