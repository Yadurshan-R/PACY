import nodemailer from "nodemailer";
const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;

interface SendOTPEmailParams {
  to: string;
  otp: string;
}

export async function sendOTPEmail({ to, otp }: SendOTPEmailParams) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailAddress,
      pass: emailPassword,
    },
  });

  const subject = `Certara Password Reset Request`;
  const text = `
Hi,

We received a request to reset your password for your Certara account.

Your One-Time Password (OTP) is: ${otp}

Please enter this OTP on the password reset page to set your new password.

If you did not request a password reset, please ignore this email or contact our support team.

Best regards,
The Certara Team
`;

  await transporter.sendMail({
    from: `"Certara Server" <${emailAddress}>`,
    to,
    subject,
    text,
  });
}
