const sgMail = require('@sendgrid/mail');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY);

    // Send welcome email to subscriber
    const welcomeEmail = {
      to: email,
      from: {
        email: 'gurpreet.pannu@datamusings.blog',
        name: 'Data Musings Newsletter'
      },
      subject: 'Welcome to Data Musings Newsletter!',
      text: 'Thank you for subscribing to Data Musings! You will receive weekly updates about new posts and insights.',
      html: `
        <h1>Welcome to Data Musings!</h1>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>You'll receive weekly updates every Sunday with our latest posts and data science insights.</p>
        <p>Best regards,<br>Data Musings Team</p>
      `
    };

    // Send notification to admin with subscriber details
    const notificationEmail = {
      to: 'gurpreet.pannu@datamusings.blog',
      from: {
        email: 'gurpreet.pannu@datamusings.blog',
        name: 'Data Musings Newsletter'
      },
      subject: 'New Newsletter Subscription - Add to List',
      text: `
New subscriber to add to your mailing list:
Email: ${email}
Time: ${new Date().toLocaleString()}

Please add this email to your mailing list for weekly digests.
      `,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>New subscriber to add to your mailing list:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Please add this email to your mailing list for weekly digests.</p>
      `
    };

    // Send both emails
    await Promise.all([
      sgMail.send(welcomeEmail),
      sgMail.send(notificationEmail)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed to newsletter' })
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to subscribe to newsletter' })
    };
  }
}; 