# Data Musings Blog

A personal blog built with React and Netlify Functions, featuring a newsletter subscription system using Zoho Mail.

## Features

- Blog posts with markdown support
- Newsletter subscription system
- Responsive design
- SEO optimization
- Newsletter unsubscribe functionality

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Zoho Mail account
- Netlify account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ZOHO_EMAIL=your-zoho-email@domain.com
ZOHO_APP_PASSWORD=your-zoho-app-password
BLOG_URL=your-blog-url
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/datamusings-blog.git
   cd datamusings-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   cd functions
   npm install
   cd ..
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. For local function testing:
   ```bash
   netlify dev
   ```

## Deployment

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Netlify will automatically deploy your site from the GitHub repository.

3. Set up environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment variables
   - Add the required environment variables

## Newsletter Setup

1. Create a Zoho Mail account if you don't have one
2. Generate an app-specific password in Zoho Mail settings
3. Set up the environment variables in Netlify
4. Test the newsletter subscription system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
