const nodemailer = require('nodemailer');

// Create a transporter using Zoho Mail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD
  },
  debug: true // Enable debug logging
});

// Helper function to send email
const sendEmail = async (emailOptions) => {
  try {
    console.log('Attempting to send email with options:', {
      to: emailOptions.to,
      subject: emailOptions.subject,
      from: emailOptions.from
    });
    
    const info = await transporter.sendMail(emailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

exports.handler = async (event, context) => {
  console.log('Received event:', event);
  
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      console.error('Error parsing request body:', e);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid request body format' })
      };
    }

    const { email, action } = body;
    console.log('Processing request:', { email, action });

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Please provide a valid email address.' })
      };
    }

    // Verify environment variables
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD || !process.env.BLOG_URL) {
      console.error('Missing required environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Server configuration error' })
      };
    }

    if (action === 'subscribe') {
      // Send welcome email with unsubscribe link
      const welcomeEmail = {
        from: `"Data Musings" <${process.env.ZOHO_EMAIL}>`,
        to: email,
        subject: 'Welcome to Data Musings Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a8917;">Welcome to Data Musings Newsletter!</h1>
            <p>Thank you for subscribing to my blog newsletter. You'll now receive updates about new posts directly in your inbox.</p>
            <p>To unsubscribe from our newsletter, please click the button below:</p>
            <a href="${process.env.BLOG_URL}/unsubscribe?email=${encodeURIComponent(email)}" 
               style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; margin: 20px 0;">
              Unsubscribe
            </a>
            <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
          </div>
        `,
        headers: {
          'List-Unsubscribe': `<mailto:${process.env.ZOHO_EMAIL}?subject=unsubscribe>, <${process.env.BLOG_URL}/unsubscribe?email=${encodeURIComponent(email)}>`
        }
      };

      await sendEmail(welcomeEmail);

      // Send notification to admin
      const adminEmail = {
        from: `"Data Musings" <${process.env.ZOHO_EMAIL}>`,
        to: process.env.ZOHO_EMAIL,
        subject: 'New Newsletter Subscription',
        text: `New subscriber: ${email}`,
        html: `<p>New subscriber: ${email}</p>`
      };

      await sendEmail(adminEmail);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Successfully subscribed!' })
      };
    } else if (action === 'unsubscribe') {
      // Send confirmation email for unsubscribe
      const unsubscribeEmail = {
        from: `"Data Musings" <${process.env.ZOHO_EMAIL}>`,
        to: email,
        subject: 'Unsubscribed from Data Musings Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc3545;">Unsubscribed Successfully</h1>
            <p>You have been successfully unsubscribed from the Data Musings newsletter.</p>
            <p>If you change your mind, you can always subscribe again by visiting our website.</p>
            <p>Best regards,<br>The Data Musings Team</p>
          </div>
        `
      };

      await sendEmail(unsubscribeEmail);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Successfully unsubscribed!' })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid action specified.' })
      };
    }
  } catch (error) {
    console.error('Error in newsletter function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to process request. Please try again.',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 