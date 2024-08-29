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

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "85ec4e4c-4048-4244-8788-9fa93d420628",
      template_variables: {
        company_info_name: 'Auth Company',
        name
      }
    });
    console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.error('Error sending welcome email', error);
    throw new Error('Error sending welcome email:', error);
  }
}