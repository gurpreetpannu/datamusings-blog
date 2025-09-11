// using Twilio SendGrid's v3 Node.js Library
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Your SendGrid API key
sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY);

const msg = {
  to: 'gurpreet.s.pannu@gmail.com', // Your email address
  from: 'newsletter@datamusings.blog', // Your verified sender
  subject: 'Testing SendGrid',
  text: 'This is a test email sent using SendGrid',
  html: '<strong>This is a test email sent using SendGrid</strong>',
};

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  }); 