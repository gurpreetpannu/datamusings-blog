import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendSubscriptionConfirmation = async (email) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Welcome to My Blog Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a8917;">Welcome to My Blog Newsletter!</h1>
        <p>Thank you for subscribing to my blog newsletter. You'll now receive updates about new posts directly in your inbox.</p>
        <p>To confirm your subscription, please click the button below:</p>
        <a href="${process.env.BLOG_URL}/confirm-subscription?email=${encodeURIComponent(email)}" 
           style="display: inline-block; background-color: #1a8917; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; margin: 20px 0;">
          Confirm Subscription
        </a>
        <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
}; 