import { mailtrapClient, sender } from "./config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from './templates.js';

export const senfVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email verification"
    });
    console.log('Email sent successfully', response);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email: ', error);
  }
}