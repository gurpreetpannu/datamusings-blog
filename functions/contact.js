const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  if (!email || !email.includes('@') || !name || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Please provide all required fields.' }),
    };
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.YOUR_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Contact Form: ${subject || 'New Message'}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await sgMail.send(msg);

    // Send confirmation email to the sender
    const confirmationMsg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Thank you for contacting Data Musings',
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest regards,\nGurpreet`,
      html: `
        <h2>Thank you for contacting Data Musings</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
        <p>Best regards,<br>Gurpreet</p>
      `,
    };

    await sgMail.send(confirmationMsg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message. Please try again.' }),
    };
  }
}; 