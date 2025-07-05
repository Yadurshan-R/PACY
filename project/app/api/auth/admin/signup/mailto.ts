import nodemailer from "nodemailer";
const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;

interface SendOTPEmailParams {
  to: string;
  otp: string;
}


export async function sendOTPEmail({ to, otp }: SendOTPEmailParams) {


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAddress,
      pass: emailPassword,
    },
  });

  const subject = `Welcome to Certara!`;
  const text = `
Hi,

Thank you for signing up for Certara

Your One-Time Password (OTP) is: ${otp}

Please use this OTP to Login to your account.

If you did not request this, please ignore this email.

Best regards,
Certara Team
  `;

  await transporter.sendMail({
    from: `"Certara Server" <${emailAddress}>`,
    to,
    subject,
    text,
  });

}
