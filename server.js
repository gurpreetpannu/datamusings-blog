require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3001;

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const msg = {
    to: process.env.YOUR_EMAIL, // Your email address where you want to receive messages
    from: process.env.SENDGRID_FROM_EMAIL, // Verified sender email in SendGrid
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  try {
    // Add subscriber to your mailing list
    const msg = {
      to: process.env.YOUR_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: ${email}</p>`,
    };

    await sgMail.send(msg);
    
    // Send confirmation email to subscriber
    const confirmationMsg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Welcome to Data Musings Newsletter!',
      text: 'Thank you for subscribing to Data Musings! You will receive updates about new posts and content.',
      html: '<h1>Welcome to Data Musings!</h1><p>Thank you for subscribing! You will receive updates about new posts and content.</p>',
    };

    await sgMail.send(confirmationMsg);

    res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 