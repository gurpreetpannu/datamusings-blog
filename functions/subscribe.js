const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  const { email } = JSON.parse(event.body);

  if (!email || !email.includes('@')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Please provide a valid email address.' }),
    };
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Send notification to admin
    const adminMsg = {
      to: process.env.YOUR_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: ${email}</p>`,
    };

    // Send confirmation to subscriber
    const subscriberMsg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Welcome to Data Musings Newsletter!',
      text: 'Thank you for subscribing to Data Musings! You will receive updates about new posts and content.',
      html: '<h1>Welcome to Data Musings!</h1><p>Thank you for subscribing! You will receive updates about new posts and content.</p>',
    };

    await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(subscriberMsg)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed!' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to subscribe. Please try again.' }),
    };
  }
}; 